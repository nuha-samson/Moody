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
    const checkResetToken = async () => {
      setIsChecking(true)
      
      try {
        // Check URL hash for access token
        const hash = window.location.hash
        const params = new URLSearchParams(window.location.search)
        
        // Check for error in URL
        const error = params.get('error')
        const errorDesc = params.get('error_description')
        
        if (error === 'access_denied' || error === 'otp_expired') {
          setIsValidToken(false)
          setMessage('❌ This reset link has expired. Please request a new one.')
          setMessageType('error')
          setIsChecking(false)
          return
        }

        // Check for access_token in hash
        if (hash && hash.includes('access_token')) {
          setIsValidToken(true)
          setMessage('✅ Please enter your new password below.')
          setMessageType('success')
          setIsChecking(false)
          return
        }

        // If no token and no error, link is invalid
        setIsValidToken(false)
        setMessage('❌ Invalid reset link. Please request a new one.')
        setMessageType('error')
        
      } catch (err) {
        console.error('Error checking reset token:', err)
        setIsValidToken(false)
        setMessage('❌ Something went wrong. Please try again.')
        setMessageType('error')
      }
      
      setIsChecking(false)
    }

    checkResetToken()
  }, [])

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setMessageType('')

    if (newPassword.length < 6) {
      setMessage('🔐 Password must be at least 6 characters long')
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

      console.log('📥 Update response:', { data, error })

      if (error) {
        let msg = error.message
        if (msg.includes('session')) {
          msg = 'Session expired. Please request a new reset link.'
        } else if (msg.includes('code verification')) {
          msg = 'This link has expired. Please request a new one.'
        }
        setMessage('❌ ' + msg)
        setMessageType('error')
        setLoading(false)
        return
      }

      setMessage('✅ Password updated successfully! 🎉')
      setMessageType('success')
      setLoading(false)

      setTimeout(async () => {
        await supabase.auth.signOut()
        navigate('/login')
      }, 3000)

    } catch (err) {
      console.error('Error updating password:', err)
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
              placeholder="At least 6 characters"
              required
              minLength={6}
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