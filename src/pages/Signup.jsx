import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setMessageType('')

    if (!email || !email.includes('@')) {
      setMessage('📧 Please enter a valid email')
      setMessageType('error')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('🔐 Password must be at least 6 characters')
      setMessageType('error')
      setLoading(false)
      return
    }

    try {
      console.log('📤 Signing up:', email)

      // SIMPLEST POSSIBLE SIGNUP - no extra options
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      console.log('📥 Response:', { data, error })

      if (error) {
        let msg = error.message || 'Unknown error'
        if (msg.includes('User already registered')) {
          msg = 'This email is already registered. Please login.'
        } else if (msg.includes('rate limit')) {
          msg = 'Too many attempts. Please wait a few minutes.'
        }
        setMessage('❌ ' + msg)
        setMessageType('error')
        setLoading(false)
        return
      }

      if (data?.user) {
        setMessage('✅ Account created! 🎉 You can now login.')
        setMessageType('success')
        setLoading(false)
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setMessage('❌ Something went wrong. Please try again.')
        setMessageType('error')
        setLoading(false)
      }

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
        <span style={{ fontSize: '4rem' }}>🌱</span>
      </div>
      <h2>Create Your Account</h2>
      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        fontFamily: 'Courier New, monospace',
        marginBottom: '1.5rem'
      }}>
        Start tracking your mood today ✨
      </p>
      
      <form onSubmit={handleSignup} style={{ padding: '1rem 0' }}>
        <div className="uiverse-pixel-input-wrapper" style={{ marginBottom: '1.5rem' }}>
          <label className="uiverse-pixel-label">👤 Your Name</label>
          <input 
            className="uiverse-pixel-input"
            style={{ height: '50px' }}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="What should we call you?"
          />
        </div>

        <div className="uiverse-pixel-input-wrapper" style={{ marginBottom: '1.5rem' }}>
          <label className="uiverse-pixel-label">📧 Email Address</label>
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

        <div className="uiverse-pixel-input-wrapper" style={{ marginBottom: '0.5rem' }}>
          <label className="uiverse-pixel-label">🔐 Password</label>
          <input 
            className="uiverse-pixel-input"
            style={{ height: '50px' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            minLength={6}
          />
        </div>

        <div style={{ 
          padding: '0.5rem 1rem',
          marginBottom: '1.5rem',
          background: '#f0ebe3',
          border: '2px dashed #ffb81e',
          fontFamily: 'Courier New, monospace',
          fontSize: '0.85rem',
          color: '#666'
        }}>
          💡 Use 6+ characters with letters and numbers.
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
          {loading ? '⏳ Creating account...' : '✨ Start Tracking'}
        </button>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          fontFamily: 'Courier New, monospace'
        }}>
          Already have an account? <Link to="/login" style={{ color: '#ffb81e', fontWeight: 'bold' }}>Login</Link>
        </p>
      </form>
    </section>
  )
}