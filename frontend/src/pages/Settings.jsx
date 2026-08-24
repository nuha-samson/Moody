import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Settings() {
  const [name, setName] = useState('')
  const [entryCount, setEntryCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let isActive = true

    const loadData = async () => {
      const [{ data: { user } }, { data, error }] = await Promise.all([
        supabase.auth.getUser(),
        supabase
          .from('journal_entries')
          .select('*')
      ])

      if (!isActive) return

      if (user?.user_metadata?.username) {
        setName(user.user_metadata.username)
      } else if (user?.email) {
        setName(user.email.split('@')[0])
      }

      if (!error && data) {
        setEntryCount(data.length)
      }

      setLoading(false)
    }

    void loadData()

    return () => {
      isActive = false
    }
  }, [])

  const handleUpdateName = async () => {
    if (!name.trim()) {
      setMessage('❌ Name cannot be empty!')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setSaving(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      data: { username: name }
    })

    if (error) {
      setMessage('❌ ' + error.message)
    } else {
      setMessage('✅ Name updated successfully!')
      // Refresh the page to show new name
      setTimeout(() => window.location.reload(), 1500)
    }
    setSaving(false)
  }

  const handleClear = async () => {
    if (confirm('⚠️ Delete ALL entries? This cannot be undone!')) {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .neq('id', 0)

      if (error) {
        alert('❌ Error deleting entries!')
      } else {
        alert('✅ All entries deleted!')
        setEntryCount(0)
        window.location.reload()
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return (
      <section id="home" style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem' }}>
        <h2>⏳ Loading...</h2>
      </section>
    )
  }

  return (
    <section id="home" style={{ marginTop: '2rem' }}>
      <h2>⚙️ Settings</h2>

      <div style={{ 
        padding: '1.5rem',
        border: '4px solid #1a1a1a',
        marginBottom: '1.5rem',
        background: '#fcf9f2'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>👤 Profile</h3>
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
              {saving ? '⏳ Saving...' : '💾 Save Name'}
            </button>
          </div>
        </div>
        {message && (
          <div id="mood-message" style={{ marginTop: '1rem' }}>
            {message}
          </div>
        )}
      </div>

      <div style={{ 
        padding: '1.5rem',
        border: '4px solid #1a1a1a',
        marginBottom: '1.5rem',
        background: '#fcf9f2'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>📊 Statistics</h3>
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
        <h3 style={{ marginBottom: '1rem' }}>🚪 Account</h3>
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
          🚪 Logout
        </button>
      </div>
    </section>
  )
}