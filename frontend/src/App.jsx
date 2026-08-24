import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <section id="home" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>⏳ Loading...</h2>
      </section>
    )
  }

  // 🔥 ALWAYS show ResetPassword page when on /reset-password
  const isResetPage = window.location.pathname.includes('reset-password')
  
  if (isResetPage) {
    return (
      <BrowserRouter>
        <div>
          <nav className="nav">
            <div className="container" style={{ justifyContent: 'center' }}>
              <Link to="/" className="btn" style={{ fontSize: '1.2rem' }}>🌱 Moody</Link>
              <svg className="outline" viewBox="0 0 500 60">
                <rect className="rect" x="5" y="5" width="490" height="50" 
                      fill="none" stroke="white" strokeWidth="4" />
              </svg>
            </div>
          </nav>
          <Routes>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/*" element={<ResetPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }

  if (!session) {
    return (
      <BrowserRouter>
        <div>
          <nav className="nav">
            <div className="container" style={{ justifyContent: 'center' }}>
              <Link to="/" className="btn" style={{ fontSize: '1.2rem' }}>🌱 Moody</Link>
              <svg className="outline" viewBox="0 0 500 60">
                <rect className="rect" x="5" y="5" width="490" height="50" 
                      fill="none" stroke="white" strokeWidth="4" />
              </svg>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <div>
        <nav className="nav">
          <div className="container">
            <Link to="/" className="btn" style={{ fontSize: '1.2rem' }}>🌱 Moody</Link>
            <Link to="/history" className="btn">📖 History</Link>
            <Link to="/settings" className="btn">⚙️ Settings</Link>
            <svg className="outline" viewBox="0 0 500 60">
              <rect className="rect" x="5" y="5" width="490" height="50" 
                    fill="none" stroke="white" strokeWidth="4" />
            </svg>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App