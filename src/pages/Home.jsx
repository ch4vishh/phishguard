import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import theme from '../theme'

function Home() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleScan = () => {
    if (input.trim()) navigate(`/results/${encodeURIComponent(input)}`)
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.8, top: -200, left: -200 }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.6, top: 50, right: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(120px)', opacity: 0.4, bottom: -50, left: '30%' }} />
      </div>

      <style>{`
        .scan-btn { transition: all 0.3s ease; }
        .scan-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(64,138,113,0.4); }
        .feat-card { transition: all 0.3s ease; }
        .feat-card:hover { transform:translateY(-6px); border-color:rgba(64,138,113,0.5) !important; box-shadow:0 16px 36px rgba(9,20,19,0.7); }
        .search-input::placeholder { color: rgba(176,228,204,0.25); font-style: italic; }
        .stat-num { font-variant-numeric: tabular-nums; }
      `}</style>

      <div style={{
        position: 'relative', zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '90vh', padding: '3rem 2rem', textAlign: 'center'
      }}>

        {/* SHIELD */}
        <div style={{ marginBottom: '1.5rem' }}>
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 6V12C3 16.97 7.02 21.61 12 23C16.98 21.61 21 16.97 21 12V6L12 2Z"
              fill="url(#homeShield)" stroke="rgba(176,228,204,0.2)" strokeWidth="0.5"/>
            <path d="M9 12L11 14L15 10" stroke={theme.text}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="homeShield" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={theme.green2}/>
                <stop offset="100%" stopColor={theme.green1}/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* BADGE */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: `rgba(64,138,113,0.15)`,
          border: `1px solid rgba(64,138,113,0.3)`,
          color: theme.textSub, padding: '0.35rem 1.1rem',
          borderRadius: 999, fontSize: '0.68rem',
          letterSpacing: '2.5px', textTransform: 'uppercase',
          marginBottom: '1.5rem',
          fontFamily: theme.fontBody, fontWeight: 500
        }}>
          <div style={{ width: 6, height: 6, background: theme.safe, borderRadius: '50%', boxShadow: `0 0 6px ${theme.safe}` }} />
          Real-time threat detection
        </div>

        {/* HEADING */}
        <h1 style={{
          fontFamily: theme.fontHeading,
          fontSize: '4rem', fontWeight: 700,
          color: theme.text, lineHeight: 1.05,
          marginBottom: '0.3rem',
          letterSpacing: '-0.03em'
        }}>
          Detect Phishing
        </h1>
        <h1 style={{
          fontFamily: theme.fontHeading,
          fontSize: '4rem', fontWeight: 700,
          lineHeight: 1.05, marginBottom: '1.2rem',
          letterSpacing: '-0.03em',
          background: `linear-gradient(125deg, ${theme.green3} 20%, ${theme.green2} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Before It Strikes
        </h1>

        {/* SUBTITLE */}
        <p style={{
          color: theme.textSub, fontSize: '1rem',
          maxWidth: 500, lineHeight: 1.85,
          marginBottom: '2.8rem', fontWeight: 300,
          fontFamily: theme.fontBody,
          fontStyle: 'italic',
          letterSpacing: '0.01em'
        }}>
          Paste any suspicious URL or email address. We'll scan it against{' '}
          <span style={{ color: theme.green3, fontStyle: 'normal', fontWeight: 500 }}>70+ security engines</span>{' '}
          and give you instant results.
        </p>

        {/* SEARCH CARD */}
        <div style={{
          width: '100%', maxWidth: 660,
          background: theme.bgCard,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 28, padding: '2.2rem',
          boxShadow: `0 8px 48px rgba(9,20,19,0.6), 0 0 70px rgba(64,138,113,0.06)`,
          marginBottom: '2.8rem'
        }}>
          <span style={{
            color: theme.textMuted, fontSize: '0.65rem',
            textTransform: 'uppercase', letterSpacing: '2.5px',
            marginBottom: '1.1rem', display: 'block',
            fontFamily: theme.fontBody, fontWeight: 600
          }}>🔍 Enter URL or Email to Scan</span>

          <div style={{
            display: 'flex', gap: '0.75rem',
            background: theme.bgInput,
            border: `1px solid ${theme.border}`,
            borderRadius: 16,
            padding: '0.5rem 0.5rem 0.5rem 1.3rem',
            alignItems: 'center', marginBottom: '1.3rem'
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              placeholder="https://suspicious-site.com or user@email.com"
              className="search-input"
              style={{
                flex: 1, background: 'transparent',
                border: 'none', outline: 'none',
                color: theme.text,
                fontFamily: theme.fontMono,
                fontSize: '0.82rem',
                letterSpacing: '-0.01em'
              }}
            />
            <button onClick={handleScan} className="scan-btn" style={{
              background: theme.gradBtn,
              border: 'none', color: theme.green3,
              padding: '0.75rem 1.9rem', borderRadius: 12,
              fontSize: '0.75rem', cursor: 'pointer',
              fontFamily: theme.fontBrand,
              fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>Scan Now</button>
          </div>

          <div style={{ display: 'flex', gap: '1.8rem', justifyContent: 'center' }}>
            {[[theme.safe,'Safe'],[theme.warning,'Suspicious'],[theme.danger,'Dangerous']].map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.72rem', color: theme.textSub, fontFamily: theme.fontBody, fontWeight: 500 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}` }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', alignItems: 'center', marginBottom: '3.2rem' }}>
          {[['70+','Security Engines'],['< 2s','Scan Speed'],['24/7','Protection']].map(([num, label], i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="stat-num" style={{ fontFamily: theme.fontBrand, fontSize: '2rem', fontWeight: 800, color: theme.text, lineHeight: 1 }}>{num}</div>
                <div style={{ color: theme.textMuted, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.4rem', fontFamily: theme.fontBody, fontWeight: 600 }}>{label}</div>
              </div>
              {i < 2 && <div style={{ width: 1, height: 36, background: theme.border }} />}
            </div>
          ))}
        </div>

        {/* FEATURE CARDS */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            ['🌐','URL Scanner','Detect malicious links instantly'],
            ['📧','Email Checker','Identify phishing email addresses'],
            ['📊','Threat Report','Detailed breakdown of threats'],
            ['🕒','Scan History','Review all previous scans'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="feat-card" style={{
              background: theme.bgCard,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${theme.border}`,
              borderRadius: 18, padding: '1.3rem',
              width: 162, textAlign: 'left', cursor: 'pointer'
            }}>
              <div style={{
                fontSize: 20, marginBottom: '0.8rem',
                background: 'rgba(64,138,113,0.15)',
                border: `1px solid rgba(64,138,113,0.2)`,
                width: 42, height: 42, borderRadius: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{icon}</div>
              <div style={{ fontFamily: theme.fontHeading, color: theme.text, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.4rem' }}>{title}</div>
              <div style={{ color: theme.textMuted, fontSize: '0.71rem', lineHeight: 1.55, fontWeight: 300, fontFamily: theme.fontBody }}>{desc}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home