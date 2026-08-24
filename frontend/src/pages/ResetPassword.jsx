import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isValidToken, setIsValidToken] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      setIsChecking(true)
      
      try {
        // ✅ Get the current session – Supabase handles the token automatically
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('❌ Session error:', error)
          setIsValidToken(false)
          setMessage('❌ Invalid reset link. Please request a new one.')
          setMessageType('error')
          setIsChecking(false)
          return
        }

        if (data?.session) {
          console.log('✅ Session found!')
          setIsValidToken(true)
          setMessage('✅ Please enter your new password below.')
          setMessageType('success')
        } else {
          console.log('❌ No session found')
          setIsValidToken(false)
          setMessage('❌ No active session. Please request a new reset link.')
          setMessageType('error')
        }
        
      } catch (err) {
        console.error('❌ Error:', err)
        setIsValidToken(false)
        setMessage('❌ Something went wrong. Please try again.')
        setMessageType('error')
      }
      
      setIsChecking(false)
    }

    checkSession()
  }, [])

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setMessageType('')

    if (newPassword.length < 8) {
      setMessage('🔐 Password must be at least 8 characters long')
      setMessageType('error')
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match!')
      setMessageType('error')
      setLoading(false)
      return
    }

    try {
      console.log('🔄 Updating password...')
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        console.error('❌ Update error:', error)
        setMessage('❌ ' + (error.message || 'Something went wrong'))
        setMessageType('error')
        setLoading(false)
        return
      }

      console.log('✅ Password updated!')
      setMessage('✅ Password updated successfully! 🎉')
      setMessageType('success')
      setLoading(false)

      setTimeout(async () => {
        await supabase.auth.signOut()
        navigate('/login')
      }, 3000)

    } catch (err) {
      console.error('❌ Error:', err)
      setMessage('❌ Network error. Please try again.')
      setMessageType('error')
      setLoading(false)
    }
  }

  if (isChecking) {
    return (
      <section id="home" style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
        <h2>⏳ Checking your link...</h2>
      </section>
    )
  }

  return (
    <section id="home" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '4rem' }}>🔐</span>
      </div>
      <h2>Set New Password</h2>
      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        fontFamily: 'Courier New, monospace',
        marginBottom: '1.5rem'
      }}>
        Choose a new password for your account.
      </p>
      
      {!isValidToken ? (
        <div style={{ padding: '2rem 0', textAlign: 'center' }}>
          {message && (
            <div 
              id="mood-message" 
              style={{ 
                marginBottom: '1.5rem',
                background: '#ff6b3522',
                borderColor: '#ff6b35'
              }}
            >
              {message}
            </div>
          )}
          
          <Link to="/forgot-password">
            <button className="doodle-btn" style={{ width: '100%', justifyContent: 'center' }}>
              📨 Request New Reset Link
            </button>
          </Link>
          
          <p style={{ 
            marginTop: '1rem',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.85rem'
          }}>
            <Link to="/login" style={{ color: '#666' }}>← Back to Login</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleReset} style={{ padding: '1rem 0' }}>
          <div className="uiverse-pixel-input-wrapper" style={{ marginBottom: '1.5rem' }}>
            <label className="uiverse-pixel-label">🔐 New Password</label>
            <input 
              className="uiverse-pixel-input"
              style={{ height: '50px' }}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
            />
          </div>

          <div className="uiverse-pixel-input-wrapper" style={{ marginBottom: '1.5rem' }}>
            <label className="uiverse-pixel-label">✅ Confirm Password</label>
            <input 
              className="uiverse-pixel-input"
              style={{ height: '50px' }}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Type again to confirm"
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
            {loading ? '⏳ Updating...' : '🔑 Update Password'}
          </button>

          <p style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            fontFamily: 'Courier New, monospace'
          }}>
            <Link to="/login" style={{ color: '#ffb81e', fontWeight: 'bold' }}>← Back to Login</Link>
          </p>
        </form>
      )}
    </section>
  )
}