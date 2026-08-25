import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from "../services/api";

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");
  setMessageType("");

  try {
    await api.signup({
      name: username,
      email,
      password,
    });

    setMessage("✅ Account created successfully!");
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