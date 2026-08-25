import { useEffect, useState } from "react";
import { api } from "../services/api";

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

const moods = [
  "happy",
  "content",
  "neutral",
  "sad",
  "very sad",
  "excited",
  "relaxed",
  "tired",
  "angry",
  "overwhelmed",
];

export default function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editMood, setEditMood] = useState("");
  const [editNote, setEditNote] = useState("");
  const [saving, setSaving] = useState(false);

  const loadEntries = async () => {
    try {
      setLoading(true);

      const response = await api.getMoods();

      setEntries(response.data || []);
      setMessage("");
    } catch (error) {
      console.error("Failed to load moods:", error);
      setMessage(error.message || "Could not load your entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
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
      setMessage("Please select a mood.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await api.updateMood(id, {
        mood: editMood,
        note: editNote,
      });

      setEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry._id === id ? response.data : entry
        )
      );

      cancelEditing();
      setMessage("✅ Entry updated successfully.");
    } catch (error) {
      console.error("Failed to update mood:", error);
      setMessage(error.message || "Could not update the entry.");
    } finally {
      setSaving(false);
    }
  };

  const deleteEntry = async (id) => {
    const confirmed = window.confirm(
      "Delete this journal entry? This cannot be undone."
    );

    if (!confirmed) return;

    try {
      await api.deleteMood(id);

      setEntries((currentEntries) =>
        currentEntries.filter((entry) => entry._id !== id)
      );

      setMessage("🗑️ Entry deleted.");
    } catch (error) {
      console.error("Failed to delete mood:", error);
      setMessage(error.message || "Could not delete the entry.");
    }
  };

  if (loading) {
    return (
      <section
        id="history"
        style={{ marginTop: "2rem", textAlign: "center", padding: "3rem" }}
      >
        <h2>⏳ Loading your entries...</h2>
      </section>
    );
  }

  return (
    <section id="history" style={{ marginTop: "2rem" }}>
      <h2>📚 All Journal Entries</h2>

      {message && (
        <div id="mood-message" style={{ marginBottom: "1rem" }}>
          {message}
        </div>
      )}

      {entries.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#666",
            fontFamily: "Courier New, monospace",
            fontSize: "1.2rem",
          }}
        >
          No entries yet. Start your journal! 📝
        </p>
      ) : (
        <ul>
          {entries.map((entry) => {
            const isEditing = editingId === entry._id;

            return (
              <li
                key={entry._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "0.75rem",
                  padding: "1rem 1.2rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <span style={{ fontSize: "2rem" }}>
                    {moodEmoji[entry.mood]}
                  </span>
                </div>

                {isEditing ? (
                  <>
                    <select
                      value={editMood}
                      onChange={(e) => setEditMood(e.target.value)}
                      disabled={saving}
                      className="uiverse-pixel-input"
                    >
                      {moods.map((mood) => (
                        <option key={mood} value={mood}>
                          {moodEmoji[mood]}{" "}
                          {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </option>
                      ))}
                    </select>

                    <textarea
                      className="uiverse-pixel-input"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      maxLength={1000}
                      rows={5}
                      disabled={saving}
                    />

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        className="doodle-btn"
                        onClick={() => saveEdit(entry._id)}
                        disabled={saving}
                      >
                        {saving ? "⏳ Saving..." : "💾 Save"}
                      </button>

                      <button
                        className="doodle-btn"
                        onClick={cancelEditing}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        color: "#ffde59",
                        fontFamily: "Courier New, monospace",
                        fontSize: "0.95rem",
                        width: "100%",
                        padding: "0.5rem 0",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {entry.note || "No journal note."}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        className="doodle-btn"
                        onClick={() => startEditing(entry)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="doodle-btn"
                        onClick={() => deleteEntry(entry._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}