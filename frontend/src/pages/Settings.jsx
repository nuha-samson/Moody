import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from "../services/api";

export default function Settings() {
  const [name, setName] = useState('')
  const [entryCount, setEntryCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
  let isActive = true;

  const loadData = async () => {
    try {
      const response = await api.getMoods();

      if (isActive) {
        setEntryCount(response.data?.length || 0);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  };

  loadData();

  return () => {
    isActive = false;
  };
}, []);

  const handleUpdateName = async () => {
    if (!name.trim()) {
      setMessage(' Name cannot be empty!')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setSaving(true)
    setMessage('')

    

    if (error) {
      setMessage(' something went wrong: ' + error.message)
    } else {
      setMessage(' Name updated successfully!')
      // Refresh the page to show new name
      setTimeout(() => window.location.reload(), 1500)
    }
    setSaving(false)
  }

  const handleClear = async () => {
  if (!confirm("⚠️ Delete ALL entries? This cannot be undone!")) {
    return;
  }

  try {
    await api.deleteAllMoods();

    setEntryCount(0);

    setMessage(' All entries deleted!')
  } catch (error) {
    setMessage(` something went wrong: ${error.message}`);
  }
};

  const handleLogout = async () => {
  try {
    await api.logout();

    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  if (loading) {
    return (
      <section id="home" style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem' }}>
        <h2>⏳ Loading...</h2>
      </section>
    )
  }

  return (
    <section id="home" style={{ marginTop: '2rem' }}>
      <h2> Settings</h2>
{/**
      <div style={{ 
        padding: '1.5rem',
        border: '4px solid #1a1a1a',
        marginBottom: '1.5rem',
        background: '#fcf9f2'
      }}>
         
        <h3 style={{ marginBottom: '1rem' }}> Profile</h3>
        <div className="uiverse-pixel-input-wrapper">
          <label className="uiverse-pixel-label">Your Name</label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input 
              className="uiverse-pixel-input" 
              style={{ height: '50px', flex: 1 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <button 
              className="doodle-btn" 
              style={{ 
                fontSize: '1rem', 
                padding: '10px 20px',
                minWidth: '120px'
              }}
              onClick={handleUpdateName}
              disabled={saving}
            >
              {saving ? ' Saving...' : ' Save Name'}
            </button>
          </div>
        </div>
        {message && (
          <div id="mood-message" style={{ marginTop: '1rem' }}>
            {message}
          </div>
        )}
      </div>
*/}
      <div style={{ 
        padding: '1.5rem',
        border: '4px solid #1a1a1a',
        marginBottom: '1.5rem',
        background: '#fcf9f2'
      }}>
        <h3 style={{ marginBottom: '1rem' }}> Statistics</h3>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '1.2rem' }}>
          Total Journal Entries: {entryCount}
        </p>
      </div>

      <div style={{ 
        padding: '1.5rem',
        border: '4px solid #1a1a1a',
        marginBottom: '1.5rem',
        background: '#fcf9f2'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>🗑️ Data</h3>
        <button 
          className="doodle-btn" 
          style={{ 
            fontSize: '1rem', 
            padding: '10px 20px',
            background: '#ff6b35'
          }}
          onClick={handleClear}
        >
          🗑️ Delete All Entries
        </button>
      </div>

      <div style={{ 
        padding: '1.5rem',
        border: '4px solid #1a1a1a',
        background: '#fcf9f2'
      }}>
        <h3 style={{ marginBottom: '1rem' }}> Account</h3>
        <button 
          className="doodle-btn" 
          style={{ 
            fontSize: '1rem', 
            padding: '10px 20px',
            background: '#ff6b35',
            width: '100%',
            justifyContent: 'center'
          }}
          onClick={handleLogout}
        >
           Logout
        </button>
      </div>
    </section>
  )
}