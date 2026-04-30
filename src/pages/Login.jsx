import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import theme from '../theme'

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
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/') }, 1500)
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* BACKGROUND */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', background: '#091413'
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
          padding: 0.8rem 1rem;
          color: #B0E4CC;
          font-size: 0.88rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 400;
          box-sizing: border-box;
        }
        .input-field::placeholder { color: rgba(176,228,204,0.3); font-style: italic; }
        .input-field:focus {
          border-color: rgba(64,138,113,0.9) !important;
          box-shadow: 0 0 20px rgba(64,138,113,0.25);
          outline: none;
        }
        .submit-btn { transition: all 0.3s ease; }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(64,138,113,0.4);
          background: linear-gradient(135deg,#408A71,#285A48) !important;
        }
        .submit-btn:active { transform: translateY(0); }
        .toggle-tab { transition: all 0.3s ease; cursor: pointer; }
        .toggle-tab:hover { color: #B0E4CC !important; }
        .logo-glow {
          filter: drop-shadow(0 0 14px rgba(64,138,113,0.5));
          transition: all 0.3s ease;
        }
        .logo-glow:hover {
          filter: drop-shadow(0 0 22px rgba(64,138,113,0.8));
          transform: scale(1.04);
        }
        .switch-link {
          color: #408A71;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
          font-weight: 500;
        }
        .switch-link:hover { color: #B0E4CC; }
        .feat-row { transition: all 0.2s ease; }
        .feat-row:hover { transform: translateX(4px); }
      `}</style>

      {/* MAIN LAYOUT */}
      <div style={{ position: 'relative', zIndex: 5, display: 'flex', minHeight: '100vh' }}>

        {/* LEFT — branding */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '3rem',
          borderRight: '1px solid rgba(64,138,113,0.15)'
        }}>

          <div className="logo-glow" style={{ marginBottom: '2rem' }}>
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
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

          <div style={{
            fontFamily: theme.fontBrand,
            fontSize: '2.2rem', fontWeight: 800,
            color: '#B0E4CC', letterSpacing: '0.05em',
            marginBottom: '0.5rem', textAlign: 'center', lineHeight: 1
          }}>PHISHGUARD</div>

          <p style={{
            color: 'rgba(176,228,204,0.6)',
            fontSize: '0.88rem', textAlign: 'center',
            maxWidth: 270, lineHeight: 1.85,
            fontFamily: theme.fontBody, fontWeight: 300,
            fontStyle: 'italic', marginBottom: '2.8rem'
          }}>
            Your real-time shield against phishing attacks and cyber threats.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              ['🌐', 'Scan any URL instantly'],
              ['📧', 'Detect phishing emails'],
              ['📊', 'Full threat reports'],
              ['🕒', 'Complete scan history'],
            ].map(([icon, text]) => (
              <div key={text} className="feat-row" style={{
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                color: 'rgba(176,228,204,0.7)',
                fontFamily: theme.fontBody, fontSize: '0.84rem', fontWeight: 400
              }}>
                <div style={{
                  width: 34, height: 34,
                  background: 'rgba(64,138,113,0.2)',
                  border: '1px solid rgba(64,138,113,0.3)',
                  borderRadius: 9,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 15, flexShrink: 0
                }}>{icon}</div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: '3rem'
        }}>
          <div style={{
            width: '100%', maxWidth: 420,
            background: 'rgba(40,90,72,0.2)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(64,138,113,0.25)',
            borderRadius: 28, padding: '2.8rem',
            boxShadow: '0 8px 48px rgba(9,20,19,0.8), 0 0 60px rgba(64,138,113,0.06)'
          }}>

            <h2 style={{
              fontFamily: theme.fontHeading,
              color: '#B0E4CC', fontSize: '1.4rem',
              fontWeight: 700, textAlign: 'center',
              letterSpacing: '-0.02em', marginBottom: '0.3rem'
            }}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p style={{
              color: 'rgba(176,228,204,0.5)',
              fontSize: '0.78rem', textAlign: 'center',
              marginBottom: '2.2rem',
              fontFamily: theme.fontBody, fontWeight: 300,
              fontStyle: 'italic'
            }}>
              {isLogin ? 'Login to access your threat dashboard' : 'Sign up to start scanning threats'}
            </p>

            {/* TABS */}
            <div style={{
              display: 'flex',
              background: 'rgba(9,20,19,0.6)',
              borderRadius: 12, padding: '4px',
              marginBottom: '2rem',
              border: '1px solid rgba(64,138,113,0.2)'
            }}>
              {['Login', 'Register'].map((tab) => (
                <div key={tab} className="toggle-tab"
                  onClick={() => { setIsLogin(tab === 'Login'); setErrors({}) }}
                  style={{
                    flex: 1, textAlign: 'center',
                    padding: '0.65rem', borderRadius: 9,
                    fontSize: '0.78rem',
                    fontFamily: theme.fontBody, fontWeight: 600,
                    letterSpacing: '0.3px',
                    background: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register')
                      ? 'linear-gradient(135deg,#285A48,#408A71)'
                      : 'transparent',
                    color: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register')
                      ? '#B0E4CC' : 'rgba(176,228,204,0.5)',
                  }}>
                  {tab}
                </div>
              ))}
            </div>

            {/* FIELDS */}
            {[
              ...(!isLogin ? [{ name: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' }] : []),
              { name: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
              { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
            ].map(({ name, label, placeholder, type }) => (
              <div key={name} style={{ marginBottom: '1.3rem' }}>
                <label style={{
                  color: 'rgba(176,228,204,0.6)', fontSize: '0.68rem',
                  textTransform: 'uppercase', letterSpacing: '1.5px',
                  display: 'block', marginBottom: '0.5rem',
                  fontFamily: theme.fontBody, fontWeight: 600
                }}>{label}</label>
                <input name={name} type={type}
                  value={formData[name]}
                  onChange={handleChange} placeholder={placeholder}
                  className="input-field"
                  style={{ border: `1px solid ${errors[name] ? '#F87171' : 'rgba(64,138,113,0.3)'}` }}
                />
                {errors[name] && (
                  <p style={{ color: '#F87171', fontSize: '0.72rem', marginTop: '0.4rem', fontFamily: theme.fontBody }}>
                    ⚠ {errors[name]}
                  </p>
                )}
              </div>
            ))}

            {/* SUBMIT */}
            <button onClick={handleSubmit} disabled={loading}
              className="submit-btn"
              style={{
                width: '100%', marginTop: '0.5rem',
                background: loading ? 'rgba(64,138,113,0.3)' : 'linear-gradient(135deg,#285A48,#408A71)',
                border: 'none', color: '#B0E4CC',
                padding: '0.95rem', borderRadius: 13,
                fontSize: '0.78rem', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: theme.fontBrand,
                fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
              {loading ? 'Verifying…' : isLogin ? 'Login' : 'Create Account'}
            </button>

            <p style={{
              color: 'rgba(176,228,204,0.5)', fontSize: '0.74rem',
              textAlign: 'center', marginTop: '1.6rem',
              fontFamily: theme.fontBody
            }}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="switch-link" onClick={() => { setIsLogin(!isLogin); setErrors({}) }}>
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