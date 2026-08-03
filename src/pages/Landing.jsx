import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🌱</div>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 5rem)', 
          fontWeight: 900,
          letterSpacing: '-2px',
          marginBottom: '1rem'
        }}>
          Track Your Mood.<br />
          Write Your Story.
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto 2rem auto',
          fontFamily: 'Courier New, monospace'
        }}>
          A simple, beautiful space to check in with yourself every day.
          No fluff. Just you and your journal.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup">
            <button className="doodle-btn" style={{ fontSize: '1.3rem', padding: '18px 40px' }}>
              🌱 Start Your Journey
            </button>
          </Link>
          <Link to="/login">
            <button className="doodle-btn" style={{ 
              fontSize: '1.3rem', 
              padding: '18px 40px',
              background: '#f0ebe3'
            }}>
              🔐 I Have an Account
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="home" style={{ marginTop: '2rem', padding: '3rem 2rem' }}>
        <h2 style={{ textAlign: 'center' }}>✨ How It Works</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{ 
            padding: '2rem',
            border: '4px solid #1a1a1a',
            background: '#fcf9f2',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😊</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pick Your Mood</h3>
            <p style={{ color: '#666', fontFamily: 'Courier New, monospace' }}>
              Choose from 10 moods. How are you really feeling?
            </p>
          </div>

          <div style={{ 
            padding: '2rem',
            border: '4px solid #1a1a1a',
            background: '#fcf9f2',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Write It Down</h3>
            <p style={{ color: '#666', fontFamily: 'Courier New, monospace' }}>
              No judgment. Just honest words about your day.
            </p>
          </div>

          <div style={{ 
            padding: '2rem',
            border: '4px solid #1a1a1a',
            background: '#fcf9f2',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>See Your Growth</h3>
            <p style={{ color: '#666', fontFamily: 'Courier New, monospace' }}>
              Watch your emotional journey unfold over time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="home" style={{ marginTop: '2rem', padding: '3rem 2rem' }}>
        <h2 style={{ textAlign: 'center' }}>🌟 Join the Moody Community</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffb81e' }}>100%</p>
            <p style={{ fontFamily: 'Courier New, monospace', color: '#666' }}>Free</p>
          </div>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffb81e' }}>☁️</p>
            <p style={{ fontFamily: 'Courier New, monospace', color: '#666' }}>Cloud Synced</p>
          </div>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffb81e' }}>🔒</p>
            <p style={{ fontFamily: 'Courier New, monospace', color: '#666' }}>Private & Secure</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="home" style={{ marginTop: '2rem', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Ready to Start Your Journey?
        </h2>
        <p style={{ 
          color: '#666', 
          fontFamily: 'Courier New, monospace',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Join thousands of people tracking their mood every day.
        </p>
        <Link to="/signup">
          <button className="doodle-btn" style={{ fontSize: '1.4rem', padding: '20px 50px' }}>
            🌱 Get Started Free
          </button>
        </Link>
      </section>
    </div>
  )
}