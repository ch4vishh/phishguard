import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1500)
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* BACKGROUND */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        background: '#091413'
      }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,#285A48,transparent)', filter: 'blur(100px)', opacity: 0.8, top: -200, left: -200 }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,#408A71,transparent)', filter: 'blur(100px)', opacity: 0.6, bottom: -150, right: -150 }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,#B0E4CC,transparent)', filter: 'blur(120px)', opacity: 0.15, top: '40%', left: '50%' }} />
      </div>

      <style>{`
        .input-field {
          transition: all 0.3s ease;
          width: 100%;
          background: rgba(9,20,19,0.7);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #B0E4CC;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }
        .input-field::placeholder { color: rgba(176,228,204,0.3); }
        .input-field:focus {
          border-color: rgba(64,138,113,0.9) !important;
          box-shadow: 0 0 20px rgba(64,138,113,0.25);
          outline: none;
        }
        .submit-btn {
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(64,138,113,0.4);
          background: linear-gradient(135deg,#408A71,#285A48) !important;
        }
        .submit-btn:active { transform: translateY(0); }
        .toggle-tab { transition: all 0.3s ease; cursor: pointer; }
        .toggle-tab:hover { color: #B0E4CC !important; }
        .logo-glow {
          filter: drop-shadow(0 0 12px rgba(64,138,113,0.5));
          transition: all 0.3s ease;
        }
        .logo-glow:hover {
          filter: drop-shadow(0 0 20px rgba(64,138,113,0.8));
          transform: scale(1.05);
        }
        .switch-link {
          color: #408A71;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .switch-link:hover { color: #B0E4CC; }
      `}</style>

      {/* MAIN LAYOUT — split screen */}
      <div style={{
        position: 'relative', zIndex: 5,
        display: 'flex', minHeight: '100vh'
      }}>

        {/* LEFT SIDE — branding */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '3rem',
          borderRight: '1px solid rgba(64,138,113,0.15)'
        }}>

          {/* BIG SHIELD */}
          <div className="logo-glow" style={{ marginBottom: '2rem' }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 6V12C3 16.97 7.02 21.61 12 23C16.98 21.61 21 16.97 21 12V6L12 2Z"
                fill="url(#bigShield)" stroke="rgba(176,228,204,0.2)" strokeWidth="0.5"/>
              <path d="M9 12L11 14L15 10" stroke="#B0E4CC"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="bigShield" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#408A71"/>
                  <stop offset="100%" stopColor="#285A48"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '2rem', fontWeight: 900,
            color: '#B0E4CC', letterSpacing: '3px',
            marginBottom: '1rem', textAlign: 'center'
          }}>PHISHGUARD</h1>

          <p style={{
            color: 'rgba(176,228,204,0.6)',
            fontSize: '0.9rem', textAlign: 'center',
            maxWidth: 280, lineHeight: 1.8,
            fontFamily: 'Inter, sans-serif', fontWeight: 300
          }}>
            Your real-time shield against phishing attacks and cyber threats.
          </p>

          {/* FEATURE LIST */}
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['🌐', 'Scan any URL instantly'],
              ['📧', 'Detect phishing emails'],
              ['📊', 'Full threat reports'],
              ['🕒', 'Complete scan history'],
            ].map(([icon, text]) => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                color: 'rgba(176,228,204,0.7)',
                fontFamily: 'Inter, sans-serif', fontSize: '0.85rem'
              }}>
                <div style={{
                  width: 32, height: 32,
                  background: 'rgba(64,138,113,0.2)',
                  border: '1px solid rgba(64,138,113,0.3)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 14
                }}>{icon}</div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — form */}
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: '3rem'
        }}>

          <div style={{
            width: '100%', maxWidth: 420,
            background: 'rgba(40,90,72,0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(64,138,113,0.25)',
            borderRadius: 24, padding: '2.5rem',
            boxShadow: '0 8px 40px rgba(9,20,19,0.8), 0 0 60px rgba(64,138,113,0.06)'
          }}>

            {/* HEADING */}
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#B0E4CC', fontSize: '1.3rem',
              fontWeight: 700, textAlign: 'center',
              letterSpacing: '1px', marginBottom: '0.4rem'
            }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{
              color: 'rgba(176,228,204,0.5)',
              fontSize: '0.78rem', textAlign: 'center',
              marginBottom: '2rem',
              fontFamily: 'Inter, sans-serif', fontWeight: 300
            }}>
              {isLogin ? 'Login to access your threat dashboard' : 'Sign up to start scanning threats'}
            </p>

            {/* TABS */}
            <div style={{
              display: 'flex',
              background: 'rgba(9,20,19,0.6)',
              borderRadius: 10, padding: '4px',
              marginBottom: '1.8rem',
              border: '1px solid rgba(64,138,113,0.2)'
            }}>
              {['Login', 'Register'].map((tab) => (
                <div key={tab} className="toggle-tab"
                  onClick={() => { setIsLogin(tab === 'Login'); setErrors({}) }}
                  style={{
                    flex: 1, textAlign: 'center',
                    padding: '0.6rem', borderRadius: 8,
                    fontSize: '0.78rem',
                    fontFamily: 'Inter, sans-serif', fontWeight: 500,
                    letterSpacing: '0.5px',
                    background: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register')
                      ? 'linear-gradient(135deg,#408A71,#285A48)'
                      : 'transparent',
                    color: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register')
                      ? '#B0E4CC' : 'rgba(176,228,204,0.5)',
                  }}>
                  {tab}
                </div>
              ))}
            </div>

            {/* NAME */}
            {!isLogin && (
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{
                  color: 'rgba(176,228,204,0.6)', fontSize: '0.7rem',
                  textTransform: 'uppercase', letterSpacing: '1px',
                  display: 'block', marginBottom: '0.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}>Full Name</label>
                <input name="name" value={formData.name}
                  onChange={handleChange} placeholder="John Doe"
                  className="input-field"
                  style={{ border: `1px solid ${errors.name ? '#F87171' : 'rgba(64,138,113,0.3)'}` }}
                />
                {errors.name && <p style={{ color: '#F87171', fontSize: '0.72rem', marginTop: '0.4rem', fontFamily: 'Inter, sans-serif' }}>⚠ {errors.name}</p>}
              </div>
            )}

            {/* EMAIL */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                color: 'rgba(176,228,204,0.6)', fontSize: '0.7rem',
                textTransform: 'uppercase', letterSpacing: '1px',
                display: 'block', marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>Email Address</label>
              <input name="email" value={formData.email}
                onChange={handleChange} placeholder="you@example.com"
                className="input-field"
                style={{ border: `1px solid ${errors.email ? '#F87171' : 'rgba(64,138,113,0.3)'}` }}
              />
              {errors.email && <p style={{ color: '#F87171', fontSize: '0.72rem', marginTop: '0.4rem', fontFamily: 'Inter, sans-serif' }}>⚠ {errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: '1.8rem' }}>
              <label style={{
                color: 'rgba(176,228,204,0.6)', fontSize: '0.7rem',
                textTransform: 'uppercase', letterSpacing: '1px',
                display: 'block', marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>Password</label>
              <input name="password" type="password"
                value={formData.password}
                onChange={handleChange} placeholder="••••••••"
                className="input-field"
                style={{ border: `1px solid ${errors.password ? '#F87171' : 'rgba(64,138,113,0.3)'}` }}
              />
              {errors.password && <p style={{ color: '#F87171', fontSize: '0.72rem', marginTop: '0.4rem', fontFamily: 'Inter, sans-serif' }}>⚠ {errors.password}</p>}
            </div>

            {/* SUBMIT */}
            <button onClick={handleSubmit} disabled={loading}
              className="submit-btn"
              style={{
                width: '100%',
                background: loading
                  ? 'rgba(64,138,113,0.3)'
                  : 'linear-gradient(135deg,#285A48,#408A71)',
                border: 'none', color: '#B0E4CC',
                padding: '0.9rem', borderRadius: 12,
                fontSize: '0.82rem', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700, letterSpacing: '2px',
              }}>
              {loading ? 'VERIFYING...' : isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
            </button>

            <p style={{
              color: 'rgba(176,228,204,0.5)', fontSize: '0.75rem',
              textAlign: 'center', marginTop: '1.5rem',
              fontFamily: 'Inter, sans-serif'
            }}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="switch-link"
                onClick={() => { setIsLogin(!isLogin); setErrors({}) }}>
                {isLogin ? 'Register' : 'Login'}
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login