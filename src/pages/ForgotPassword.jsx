import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, SUPABASE_ANON_KEY } from '../supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setMessageType('')

    try {
      // ✅ FORCE the API key in the request
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: window.location.origin + '/reset-password',
        },
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
          },
        }
      )

      if (error) {
        let msg = error.message
        if (msg.includes('rate limit')) {
          msg = 'Too many requests. Please wait a few minutes.'
        } else if (msg.includes('not found')) {
          msg = 'No account found with this email.'
        }
        setMessage('❌ ' + msg)
        setMessageType('error')
        setLoading(false)
        return
      }

      setMessage('✅ Reset link sent! Check your inbox 📨')
      setMessageType('success')
      setLoading(false)

    } catch (err) {
      console.error('Error:', err)
      setMessage('❌ Network error. Please try again.')
      setMessageType('error')
      setLoading(false)
    }
  }

  return (
    <section id="home" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '4rem' }}>🔑</span>
      </div>
      <h2>Reset Password</h2>
      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        fontFamily: 'Courier New, monospace',
        marginBottom: '1.5rem'
      }}>
        Enter your email and we'll send you a reset link.
      </p>
      
      <form onSubmit={handleReset} style={{ padding: '1rem 0' }}>
        <div className="uiverse-pixel-input-wrapper" style={{ marginBottom: '1.5rem' }}>
          <label className="uiverse-pixel-label">📧 Email</label>
          <input 
            className="uiverse-pixel-input"
            style={{ height: '50px' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
          />
        </div>

        {message && (
          <div 
            id="mood-message" 
            style={{ 
              marginBottom: '1rem',
              background: messageType === 'success' ? '#8ef0ce33' : '#ff6b3522',
              borderColor: messageType === 'success' ? '#8ef0ce' : '#ff6b35'
            }}
          >
            {message}
          </div>
        )}

        <button 
          type="submit" 
          className="doodle-btn"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={loading}
        >
          {loading ? '⏳ Sending...' : '📨 Send Reset Link'}
        </button>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          fontFamily: 'Courier New, monospace'
        }}>
          <Link to="/login" style={{ color: '#ffb81e', fontWeight: 'bold' }}>← Back to Login</Link>
        </p>
      </form>
    </section>
  )
}