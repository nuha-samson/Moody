import { useState, useEffect } from 'react'
import { api } from "../services/api";

export default function History() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  let isActive = true;

  const fetchEntries = async () => {
    try {
      const response = await api.getMoods();

      if (isActive) {
        setEntries(response.data || []);
      }
    } catch (error) {
      console.error("Error loading entries:", error);
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  };

  fetchEntries();

  return () => {
    isActive = false;
  };
}, []);
const moodEmoji = {
  happy: "😊",
  content: "🙂",
  neutral: "😐",
  sad: "🙁",
  "very sad": "😢",
  excited: "😄",
  relaxed: "😌",
  tired: "😫",
  angry: "😡",
  overwhelmed: "🤯",
};
  return (
    <section id="history" style={{ marginTop: '2rem' }}>
      <h2>📚 All Journal Entries</h2>
      
      <div id="saved" style={{ maxHeight: 'none', overflow: 'visible' }}>
        {loading ? (
          <p style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666',
            fontFamily: 'Courier New, monospace',
            fontSize: '1.2rem'
          }}>
            Loading...
          </p>
        ) : entries.length === 0 ? (
          <p style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666',
            fontFamily: 'Courier New, monospace',
            fontSize: '1.2rem'
          }}>
            No entries yet. Start your journal! 📝
          </p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id} style={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                gap: '0.5rem',
                padding: '0.8rem 1.2rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center'
                }}>
                  <span>
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                 <span style={{ fontSize: "2rem" }}>
  {moodEmoji[entry.mood] || "🙂"}
</span>
                </div>
                <div style={{ 
                  color: '#ffde59',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.9rem',
                  width: '100%',
                  padding: '0.5rem 0'
                }}>
                  {entry.note}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}