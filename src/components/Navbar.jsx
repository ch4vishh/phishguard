import { NavLink, useNavigate } from 'react-router-dom'
import theme from '../theme'

function Navbar() {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        .nav-link { transition: all 0.3s ease; position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:${theme.green2}; transition:width 0.3s ease; }
        .nav-link:hover::after { width:100%; }
        .nav-link:hover { color:${theme.text} !important; }
        .login-btn { transition: all 0.3s ease; }
        .login-btn:hover { background:rgba(64,138,113,0.5) !important; transform:translateY(-2px); box-shadow:0 4px 20px rgba(64,138,113,0.3); }
        .logo-wrap { transition: all 0.3s ease; }
        .logo-wrap:hover { transform:scale(1.05); filter:drop-shadow(0 0 8px rgba(64,138,113,0.6)); }
      `}</style>

      <nav style={{
        position: 'relative', zIndex: 100,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 3rem',
        background: theme.bgNav,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.border}`,
      }}>

        <div className="logo-wrap" style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.1rem', fontWeight: 700,
          color: theme.text, display: 'flex',
          alignItems: 'center', gap: '0.6rem',
          letterSpacing: '1px', cursor: 'pointer'
        }} onClick={() => navigate('/')}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 6V12C3 16.97 7.02 21.61 12 23C16.98 21.61 21 16.97 21 12V6L12 2Z"
              fill="url(#navShield)" stroke="rgba(176,228,204,0.2)" strokeWidth="0.5"/>
            <path d="M9 12L11 14L15 10" stroke={theme.text}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="navShield" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={theme.green2}/>
                <stop offset="100%" stopColor={theme.green1}/>
              </linearGradient>
            </defs>
          </svg>
          PHISHGUARD
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { to: '/', label: 'Home' },
            { to: '/history', label: 'History' },
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/about', label: 'About' },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to} className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? theme.text : theme.textSub,
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 500,
              })}>
              {label}
            </NavLink>
          ))}

          <button onClick={() => navigate('/login')} className="login-btn" style={{
            background: `rgba(64,138,113,0.2)`,
            border: `1px solid ${theme.border}`,
            color: theme.text,
            padding: '0.5rem 1.4rem',
            borderRadius: 8, fontSize: '0.75rem',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500, letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>Login</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar