import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { api } from "./services/api";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await api.getMe();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <section
        id="home"
        style={{ textAlign: "center", padding: "4rem" }}
      >
        <h2>⏳ Loading...</h2>
      </section>
    );
  }

  const isResetPage =
    window.location.pathname.includes("reset-password");

  if (isResetPage) {
    return (
      <BrowserRouter>
        <div>
          <nav className="nav">
            <div
              className="container"
              style={{ justifyContent: "center" }}
            >
              <Link
                to="/"
                className="btn"
                style={{ fontSize: "1.2rem" }}
              >
                🌱 Moody
              </Link>

              <svg className="outline" viewBox="0 0 500 60">
                <rect
                  className="rect"
                  x="5"
                  y="5"
                  width="490"
                  height="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </nav>

          <Routes>
            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />
            <Route
              path="*"
              element={<ResetPassword />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  if (!user) {
    return (
      <BrowserRouter>
        <div>
          <nav className="nav">
            <div
              className="container"
              style={{ justifyContent: "center" }}
            >
              <Link
                to="/"
                className="btn"
                style={{ fontSize: "1.2rem" }}
              >
                🌱 Moody
              </Link>

              <svg className="outline" viewBox="0 0 500 60">
                <rect
                  className="rect"
                  x="5"
                  y="5"
                  width="490"
                  height="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Landing />} />
           <Route path="/login" element={<Login setUser={setUser} />} />
<Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />
            <Route path="*" element={<Landing />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <nav className="nav">
          <div className="container">
            <Link
              to="/"
              className="btn"
              style={{ fontSize: "1.2rem" }}
            >
              🌱 Moody
            </Link>

            <Link to="/history" className="btn">
              📖 History
            </Link>

            <Link to="/settings" className="btn">
              ⚙️ Settings
            </Link>

            <svg className="outline" viewBox="0 0 500 60">
              <rect
                className="rect"
                x="5"
                y="5"
                width="490"
                height="50"
                fill="none"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Dashboard user={user} />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/settings"
            element={<Settings user={user} />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="*"
            element={<Dashboard user={user} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;