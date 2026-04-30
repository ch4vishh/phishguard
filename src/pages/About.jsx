import theme from '../theme'

function About() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.7, top: -100, right: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.4, bottom: -100, left: -100 }} />
      </div>

      <style>{`
        .about-card { transition: all 0.3s ease; }
        .about-card:hover { transform: translateY(-4px); border-color: rgba(64,138,113,0.5) !important; }
        .cta-btn { transition: all 0.3s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(64,138,113,0.35); }
      `}</style>

      <div style={{ position: 'relative', zIndex: 5, padding: '4rem 8rem', maxWidth: 1000, margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{
            color: theme.green2,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '1rem'
          }}>About the Project</p>

          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '2.5rem', fontWeight: 900,
            color: theme.text, letterSpacing: '1px',
            lineHeight: 1.2, marginBottom: '1.5rem'
          }}>Built to keep you<br />
            <span style={{
              background: `linear-gradient(135deg, ${theme.green3}, ${theme.green2})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>one step ahead</span>
          </h1>

          <p style={{
            color: theme.textSub,
            fontSize: '1rem',
            maxWidth: 560,
            lineHeight: 1.9,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300
          }}>
            PhishGuard is a cybersecurity tool that lets you check any URL or email
            address for threats before you interact with it. No technical knowledge needed —
            just paste and scan.
          </p>
        </div>

        {/* WHAT IS PHISHING */}
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

        {/* HOW IT WORKS */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: theme.text, fontSize: '1rem',
            letterSpacing: '1px', marginBottom: '1.2rem'
          }}>How it works</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              ['01', 'Paste a URL or email', 'Enter anything suspicious into the input field on the home page.'],
              ['02', 'We send it to the APIs', 'Your input is checked against Google Safe Browsing and VirusTotal simultaneously.'],
              ['03', 'Results in seconds', 'Over 70 security engines analyze the link and return a verdict within 2 seconds.'],
              ['04', 'Read your report', 'You get a clear breakdown — safe, suspicious, or dangerous — with details.'],
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
                  color: 'rgba(64,138,113,0.12)',
                  lineHeight: 1
                }}>{num}</div>
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

        {/* SAFETY TIPS */}
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
          }}>Things worth knowing</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              'Always check the URL before clicking. One wrong letter is enough to land on a fake site.',
              'No real bank or service will ever ask for your password over email.',
              'If a message feels urgent or too good to be true, it probably is.',
              'Use two-factor authentication wherever you can.',
              'When in doubt, scan it here before you open it.',
            ].map((tip, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: '0.8rem 1rem',
                background: 'rgba(64,138,113,0.06)',
                border: `1px solid rgba(64,138,113,0.12)`,
                borderRadius: 10
              }}>
                <div style={{
                  width: 20, height: 20, flexShrink: 0,
                  background: `rgba(64,138,113,0.2)`,
                  border: `1px solid rgba(64,138,113,0.3)`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontFamily: 'Orbitron, sans-serif',
                  color: theme.green2, fontWeight: 700
                }}>{i + 1}</div>
                <span style={{
                  color: theme.textSub, fontSize: '0.85rem',
                  lineHeight: 1.7, fontFamily: 'Inter, sans-serif',
                  fontWeight: 300
                }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 20, padding: '2rem 2.5rem',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: theme.text, fontSize: '1rem',
            letterSpacing: '1px', marginBottom: '1.2rem'
          }}>Built with</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {[
              'React', 'Vite', 'React Router',
              'Context API', 'Axios',
              'Recharts', 'Tailwind CSS',
              'Google Safe Browsing API', 'VirusTotal API',
            ].map((tech) => (
              <div key={tech} style={{
                background: 'rgba(64,138,113,0.08)',
                border: `1px solid rgba(64,138,113,0.2)`,
                color: theme.textSub,
                padding: '0.35rem 0.9rem',
                borderRadius: 999,
                fontSize: '0.78rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}>{tech}</div>
            ))}
          </div>
        </div>

        {/* CTA */}
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
            display: 'inline-block',
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