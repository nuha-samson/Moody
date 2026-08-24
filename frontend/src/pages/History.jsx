import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function History() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('created_at', { ascending: false })

      if (!isActive) return

      if (!error && data) {
        setEntries(data)
      }

      setLoading(false)
    }

    void fetchEntries()

    return () => {
      isActive = false
    }
  }, [])

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
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span style={{ fontSize: '2rem' }}>{entry.mood_emoji}</span>
                </div>
                <div style={{ 
                  color: '#ffde59',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.9rem',
                  width: '100%',
                  padding: '0.5rem 0'
                }}>
                  {entry.content}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}