import theme from '../theme'

function ShieldIcon({ size = 20, color = theme.green2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6V12C3 16.97 7.02 21.61 12 23C16.98 21.61 21 16.97 21 12V6L12 2Z"
        fill={`${color}25`} stroke={color} strokeWidth="1.5"/>
      <path d="M9 12L11 14L15 10" stroke={color}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function About() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.7, top: -100, right: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.4, bottom: -100, left: -100 }} />
      </div>

      <style>{`
        .about-card { transition: all 0.3s ease; }
        .about-card:hover { transform: translateY(-4px); border-color: rgba(64,138,113,0.5) !important; }
        .cta-btn { transition: all 0.3s ease; display: inline-block; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(64,138,113,0.35); }
      `}</style>

      <div style={{ position: 'relative', zIndex: 5, padding: '4rem 8rem', maxWidth: 1000, margin: '0 auto' }}>

        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: theme.green2, fontSize: '0.75rem',
            textTransform: 'uppercase', letterSpacing: '3px',
            fontFamily: 'Inter, sans-serif', marginBottom: '1rem'
          }}>About the Project</p>

          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '2.5rem', fontWeight: 900,
            color: theme.text, letterSpacing: '1px',
            lineHeight: 1.2, marginBottom: '1.5rem'
          }}>Built to keep you
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${theme.green3}, ${theme.green2})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>one step ahead</span>
          </h1>

          <p style={{
            color: theme.textSub, fontSize: '1rem',
            maxWidth: 560, lineHeight: 1.9,
            fontFamily: 'Inter, sans-serif', fontWeight: 300
          }}>
            PhishGuard is a cybersecurity tool that lets you check any URL or email
            address for threats before you interact with it. No technical knowledge needed —
            just paste and scan.
          </p>
        </div>

        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 20, padding: '2.5rem',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: theme.text, fontSize: '1rem',
            letterSpacing: '1px', marginBottom: '1.2rem'
          }}>What is Phishing?</h2>

          <p style={{
            color: theme.textSub, lineHeight: 1.9,
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.92rem', fontWeight: 300,
            marginBottom: '1rem'
          }}>
            Phishing is when someone pretends to be a trusted source — a bank, a company,
            even a friend — to trick you into giving away your password, card details,
            or personal information. It usually comes through a link or an email that looks real.
          </p>

          <p style={{
            color: theme.textSub, lineHeight: 1.9,
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.92rem', fontWeight: 300
          }}>
            It is one of the most common attacks online today. Most people fall for it not
            because they are careless, but because these attacks are designed to look convincing.
            A single wrong click can compromise an entire account.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: theme.text, fontSize: '1rem',
            letterSpacing: '1px', marginBottom: '1.2rem'
          }}>How it works</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              ['01', 'Paste a URL or email',    'Enter anything suspicious into the input field on the home page.'],
              ['02', 'We send it to the APIs',  'Your input is checked against VirusTotal simultaneously across 70+ engines.'],
              ['03', 'Results in seconds',      'Each engine analyzes the link and returns a verdict within seconds.'],
              ['04', 'Read your report',        'You get a clear breakdown — safe, suspicious, or dangerous — with details.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="about-card" style={{
                background: theme.bgCard,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${theme.border}`,
                borderRadius: 16, padding: '1.5rem',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 14, right: 16,
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.8rem', fontWeight: 900,
                  color: 'rgba(64,138,113,0.12)', lineHeight: 1
                }}>{num}</div>

                <div style={{ marginBottom: '1rem' }}>
                  <ShieldIcon size={28} color={theme.green2} />
                </div>

                <div style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: theme.text, fontSize: '0.75rem',
                  fontWeight: 700, letterSpacing: '0.5px',
                  marginBottom: '0.6rem'
                }}>{title}</div>
                <div style={{
                  color: theme.textSub, fontSize: '0.8rem',
                  lineHeight: 1.7, fontFamily: 'Inter, sans-serif',
                  fontWeight: 300
                }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 20, padding: '2.5rem',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: theme.text, fontSize: '1rem',
            letterSpacing: '1px', marginBottom: '1.5rem'
          }}>What we detect</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              ['Malicious URLs',    theme.danger,  'Links that lead to fake websites designed to steal your login credentials or install malware.'],
              ['Phishing Emails',   theme.warning, 'Emails pretending to be from banks or companies asking you to click a link or share personal info.'],
              ['Malware Links',     theme.danger,  'URLs that automatically download harmful software onto your device when visited.'],
              ['Financial Fraud',   theme.danger,  'Fake payment pages or banking sites that capture your credit card and banking details.'],
            ].map(([title, color, desc]) => (
              <div key={title} style={{
                background: 'rgba(9,20,19,0.4)',
                border: `1px solid ${theme.border}`,
                borderRadius: 12, padding: '1.2rem',
                display: 'flex', gap: '1rem'
              }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <ShieldIcon size={22} color={color} />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    color: theme.text, fontSize: '0.85rem',
                    fontWeight: 600, marginBottom: '0.3rem'
                  }}>{title}</div>
                  <div style={{
                    color: theme.textSub, fontSize: '0.78rem',
                    lineHeight: 1.6, fontFamily: 'Inter, sans-serif',
                    fontWeight: 300
                  }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 20, padding: '2rem 2.5rem',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              color: theme.text, fontSize: '1rem',
              letterSpacing: '1px', marginBottom: '0.5rem'
            }}>Ready to scan?</h2>
            <p style={{
              color: theme.textSub, fontSize: '0.85rem',
              fontFamily: 'Inter, sans-serif', fontWeight: 300
            }}>
              Paste any suspicious link or email and get results instantly.
            </p>
          </div>
          <a href="/" className="cta-btn" style={{
            background: theme.gradBtn,
            color: theme.text,
            padding: '0.8rem 2rem',
            borderRadius: 12,
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.8rem', fontWeight: 700,
            letterSpacing: '1.5px',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}>Start Scanning</a>
        </div>

      </div>
    </div>
  )
}

export default About