import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from "../services/api";

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");
  setMessageType("");

  try {
    const response = await api.login({
  email,
  password,
});

setUser(response.user);

    setMessage("✅ Login successful!");
    setMessageType("success");

    navigate("/");
  } catch (error) {
    setMessage(`❌ ${error.message}`);
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};

 

  return (
    <section id="home" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '4rem' }}>🌱</span>
      </div>
      <h2>🔐 Welcome Back</h2>
      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        fontFamily: 'Courier New, monospace',
        marginBottom: '1.5rem'
      }}>
        Your mood journey continues...
      </p>
      
      <form onSubmit={handleLogin} style={{ padding: '1rem 0' }}>
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

        <div className="uiverse-pixel-input-wrapper" style={{ marginBottom: '0.5rem' }}>
          <label className="uiverse-pixel-label">🔐 Password</label>
          <input 
            className="uiverse-pixel-input"
            style={{ height: '50px' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        
        <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
          <Link to="/forgot-password" style={{ color: '#666', fontSize: '0.85rem', fontFamily: 'Courier New, monospace' }}>
            Forgot password?
          </Link>
        </div>

        

        {message?.includes('verify your email') && (
          <button 
            type="button"
            onClick={handleResendVerification}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffb81e',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              textDecoration: 'underline',
              marginBottom: '1rem',
              fontSize: '0.9rem',
              width: '100%'
            }}
            disabled={loading}
          >
            {loading ? '⏳ Sending...' : '🔄 Resend verification email'}
          </button>
        )}

        <button 
          type="submit" 
          className="doodle-btn"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={loading}
        >
          {loading ? '⏳ Logging in...' : '🚀 Let\'s Go!'}
        </button>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          fontFamily: 'Courier New, monospace'
        }}>
          New here? <Link to="/signup" style={{ color: '#ffb81e', fontWeight: 'bold' }}>Create Account</Link>
        </p>
      </form>
    </section>
  )
}