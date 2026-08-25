import { useState, useEffect } from 'react'
import { api } from "../services/api";

export default function Dashboard({ user }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const [journalText, setJournalText] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
const [userName, setUserName] = useState("");
  
useEffect(() => {

  if (user?.name) {

    setUserName(user.name);

  }

}, [user]);
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const loadEntries = async () => {
  try {
    const response = await api.getMoods();

    setEntries(response.data || []);
  } catch (error) {
    console.error("Error loading entries:", error);

    setMessage(
      "❌ Could not load your entries. Please refresh."
    );
  }
};
  // Load entries
 useEffect(() => {
  const fetchEntries = async () => {
    try {
      const response = await api.getMoods();

      setEntries(response.data || []);
    } catch (error) {
      console.error("Error loading entries:", error);

      setMessage(
        "❌ Could not load your entries. Please refresh."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchEntries();
}, []);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '🙂', label: 'Content' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙁', label: 'Sad' },
    { emoji: '😢', label: 'Very Sad' },
    { emoji: '😄', label: 'Excited' },
    { emoji: '😌', label: 'Relaxed' },
    { emoji: '😫', label: 'Tired' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '🤯', label: 'Overwhelmed' }
  ]
const saveEntry = async () => {
  if (!selectedMood) {
    setMessage("😅 Pick a mood first!");

    setTimeout(() => setMessage(""), 3000);

    return;
  }

  if (!journalText.trim()) {
    setMessage("✍️ Write something!");

    setTimeout(() => setMessage(""), 3000);

    return;
  }

  setSaving(true);
  setMessage("⏳ Saving...");

  try {
    await api.createMood({
      mood: selectedMood.label.toLowerCase(),
      note: journalText.trim(),
    });

    setMessage(
      `✨ Saved! ${selectedMood.emoji} "${journalText.slice(
        0,
        30
      )}..."`
    );

    setJournalText("");
    setSelectedMood(null);

    await loadEntries();

    setTimeout(() => setMessage(""), 3000);
  } catch (error) {
    setMessage(`❌ ${error.message}`);
  } finally {
    setSaving(false);
  }
};

  const deleteEntry = async (id) => {
  if (!confirm("Delete this entry?")) {
    return;
  }

  try {
    await api.deleteMood(id);

    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry._id !== id)
    );

    setMessage("🗑️ Entry deleted!");

    setTimeout(() => setMessage(""), 2000);
  } catch (error) {
    setMessage(`❌ ${error.message}`);
  }
};

  // Get greeting with name
  const hour = new Date().getHours()
  let greeting = 'Morning'
  if (hour >= 12 && hour < 17) greeting = 'Afternoon'
  if (hour >= 17) greeting = 'Evening'

  return (
    <div>
      <section id="home">
        <h2>Good {greeting}, {userName || 'Moody User'}! 👋</h2>

        <div id="mood-tracker">
          <div id="mood">
            <ul>
              {moods.map((mood, index) => (
                <li 
                  key={index}
                  onClick={() => setSelectedMood(mood)}
                  style={{
                    border: selectedMood?.emoji === mood.emoji 
                      ? '4px solid #8ef0ce' 
                      : '4px solid transparent',
                    transform: selectedMood?.emoji === mood.emoji 
                      ? 'scale(1.1)' 
                      : 'scale(1)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {mood.emoji}
                </li>
              ))}
            </ul>
          </div>

          <div id="time">
            {currentTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>

        <div id="write">
          <div className="uiverse-pixel-input-wrapper">
            <label className="uiverse-pixel-label">
              📝 Write your thoughts...
              {selectedMood && (
                <span style={{ marginLeft: '10px', color: '#8ef0ce' }}>
                  ({selectedMood.emoji} {selectedMood.label})
                </span>
              )}
            </label>
            <textarea 
              className="uiverse-pixel-input"
              placeholder="How are you really feeling today?"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              rows="3"
              disabled={saving}
            />
          </div>
          
          <button 
            className="doodle-btn" 
            onClick={saveEntry}
            disabled={saving}
          >
            <span className="btn-text">
              {saving ? '⏳ Saving...' : '✨ Save Journal'}
            </span>
            <svg className="icon-1" viewBox="0 0 24 24" width="30" height="30">
              <circle cx="12" cy="12" r="10" fill="#ff6b35" stroke="#1a1a1a" strokeWidth="2"/>
              <circle cx="8" cy="10" r="1.5" fill="#1a1a1a"/>
              <circle cx="16" cy="10" r="1.5" fill="#1a1a1a"/>
              <path d="M8 14 Q12 18 16 14" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
            </svg>
            <svg className="icon-2" viewBox="0 0 24 24" width="22" height="22">
              <rect x="4" y="4" width="16" height="16" fill="#8ef0ce" stroke="#1a1a1a" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" fill="#1a1a1a"/>
            </svg>
            <svg className="icon-3" viewBox="0 0 24 24" width="26" height="26">
              <polygon points="12,2 20,8 17,20 7,20 4,8" fill="#ffb81e" stroke="#1a1a1a" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" fill="#1a1a1a"/>
            </svg>
          </button>
        </div>

        {message && (
          <div id="mood-message">
            {message}
          </div>
        )}

        <div id="history">
          <h2>📖 Recent Journal Entries</h2>
          <div id="saved">
            {loading ? (
              <p style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: '#666',
                fontFamily: 'Courier New, monospace'
              }}>
                ⏳ Loading your entries...
              </p>
            ) : entries.length === 0 ? (
              <p style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: '#666',
                fontFamily: 'Courier New, monospace'
              }}>
                No entries yet. Start writing! 📝
              </p>
            ) : (
              <ul>
                {entries.slice(0, 10).map((entry) => (
                  <li key={entry.id}>
                    <span>
                      {new Date(entry.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span>{entry.mood_emoji}</span>
                    <span>
                      {entry.content.slice(0, 40)}
                      {entry.content.length > 40 ? '...' : ''}
                    </span>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff6b35',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0 10px'
                      }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}