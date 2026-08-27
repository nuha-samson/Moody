import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editMood, setEditMood] = useState("");
  const [editNote, setEditNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "🙂", label: "Content", value: "content" },
    { emoji: "😐", label: "Neutral", value: "neutral" },
    { emoji: "🙁", label: "Sad", value: "sad" },
    { emoji: "😢", label: "Very Sad", value: "very sad" },
    { emoji: "😄", label: "Excited", value: "excited" },
    { emoji: "😌", label: "Relaxed", value: "relaxed" },
    { emoji: "😫", label: "Tired", value: "tired" },
    { emoji: "😡", label: "Angry", value: "angry" },
    { emoji: "🤯", label: "Overwhelmed", value: "overwhelmed" },
  ];

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
        setMessage(` something went wrong could not load entries: ${error.message}`);
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

  const startEditing = (entry) => {
    setEditingId(entry._id);
    setEditMood(entry.mood);
    setEditNote(entry.note || "");
    setMessage("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditMood("");
    setEditNote("");
  };

  const saveEdit = async (id) => {
    if (!editMood) {
      setMessage(" Pick a mood first!");
      return;
    }

    if (!editNote.trim()) {
      setMessage(" Write something!");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await api.updateMood(id, {
        mood: editMood,
        note: editNote.trim(),
      });

      setEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry._id === id ? response.data : entry
        )
      );

      setMessage(" Entry updated successfully!");
      cancelEditing();
    } catch (error) {
      setMessage(` something went wrong could not update entry: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Delete this journal entry? This cannot be undone.")) {
      return;
    }

    try {
      await api.deleteMood(id);

      setEntries((currentEntries) =>
        currentEntries.filter((entry) => entry._id !== id)
      );

      setMessage(" Entry deleted!");
    } catch (error) {
      setMessage(` something went wrong could not delete entry: ${error.message}`);
    }
  };

  return (
    <section id="history" style={{ marginTop: "2rem" }}>
      <h2> My Journal Entries</h2>

      {message && (
        <div
          id="mood-message"
          style={{
            marginBottom: "1rem",
          }}
        >
          {message}
        </div>
      )}

      <div id="saved" className="history-full">
        {loading ? (
          <p className="empty-state"> Loading...</p>
        ) : entries.length === 0 ? (
          <p className="empty-state">
            No entries yet. Start your journal! 
          </p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <li key={entry._id}>
                {editingId === entry._id ? (
                  <div className="history-edit-form">
                    <div className="history-edit-header">
                      <strong>
                         Editing{" "}
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </strong>
                    </div>

                    <div className="history-mood-options">
                      {moods.map((mood) => (
                        <button
                          key={mood.value}
                          type="button"
                          className={`history-mood-option ${
                            editMood === mood.value ? "selected" : ""
                          }`}
                          onClick={() => setEditMood(mood.value)}
                          title={mood.label}
                        >
                          {mood.emoji}
                        </button>
                      ))}
                    </div>

                    <textarea
                      className="uiverse-pixel-input history-edit-input"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      maxLength={1000}
                      placeholder="Update your journal entry..."
                    />

                    <div className="history-actions">
                      <button
                        className="history-edit-save"
                        type="button"
                        onClick={() => saveEdit(entry._id)}
                        disabled={saving}
                      >
                        {saving ? "⏳ Saving..." : "💾 Save Changes"}
                      </button>

                      <button
                        className="history-cancel-btn"
                        type="button"
                        onClick={cancelEditing}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="entry-date">
                      <span>
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      <span className="entry-emoji">
                        {moodEmoji[entry.mood] || "🙂"}
                      </span>
                    </div>

                    <div className="entry-text">
                      {entry.note || "No journal note."}
                    </div>

                    <div className="history-actions">
                      <button
                        type="button"
                        className="history-edit-btn"
                        onClick={() => startEditing(entry)}
                      >
                         Edit
                      </button>

                      <button
                        type="button"
                        className="history-delete-btn"
                        onClick={() => deleteEntry(entry._id)}
                      >
                         Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}