import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { scanWithVirusTotal } from '../api/virustotal'
import { scanWithSafeBrowsing } from '../api/safebrowsing'
import { useScan } from '../context/ScanContext'
import theme from '../theme'

function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const url = decodeURIComponent(id)

  const [loading, setLoading]   = useState(true)
  const [vtResult, setVtResult] = useState(null)
  const [error, setError]       = useState(null)
  const { addScan } = useScan()
  

const getRisk = () => {
    if (!vtResult) return 'unknown'
    if (vtResult.malicious >= 10) return 'dangerous'
    if (vtResult.malicious >= 5)  return 'suspicious'
    if (vtResult.malicious >= 2)  return 'suspicious'
    return 'safe'
  }

  const risk = getRisk()

  const riskConfig = {
    safe:      { color: theme.safe,    label: 'Safe',       message: 'No threats detected. This URL appears to be safe.' },
    suspicious:{ color: theme.warning, label: 'Suspicious', message: 'Some engines flagged this URL. Proceed with caution.' },
    dangerous: { color: theme.danger,  label: 'Dangerous',  message: 'This URL is dangerous. Do not visit it.' },
    unknown:   { color: theme.textSub, label: 'Unknown',    message: 'Could not determine the threat level.' },
  }

  useEffect(() => {
    const runScan = async () => {
      try {
        setLoading(true)
        const vt = await scanWithVirusTotal(url)
setVtResult(vt)

if (vt) {
  const riskLevel =
    vt.malicious >= 10 ? 'dangerous' :
    vt.malicious >= 2  ? 'suspicious' : 'safe'

  addScan({
    url,
    risk: riskLevel,
    malicious:  vt.malicious,
    suspicious: vt.suspicious,
    harmless:   vt.harmless,
    total:      vt.total
  })
}
      } catch (err) {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    runScan()
  }, [url])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.6, top: -100, left: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.4, bottom: -100, right: -100 }} />
      </div>

      <style>{`
        .result-card { transition: all 0.3s ease; }
        .result-card:hover { border-color: rgba(64,138,113,0.4) !important; }
        .back-btn:hover { background: rgba(64,138,113,0.1) !important; color: ${theme.text} !important; }
        .scan-btn { transition: all 0.3s ease; }
        .scan-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(64,138,113,0.3); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      `}</style>

      <div style={{ position: 'relative', zIndex: 5, padding: '3rem 4rem', maxWidth: 820, margin: '0 auto' }}>

        {/* BACK BUTTON */}
        <button onClick={() => navigate('/')} className="back-btn"
          style={{
            background: 'transparent',
            border: `1px solid ${theme.border}`,
            color: theme.textSub,
            padding: '0.5rem 1.2rem',
            borderRadius: 8, fontSize: '0.78rem',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '2rem',
            transition: 'all 0.2s'
          }}>
          Back to Scanner
        </button>

        {/* PAGE TITLE */}
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          color: theme.text, fontSize: '1.5rem',
          letterSpacing: '1px', marginBottom: '0.5rem'
        }}>Scan Results</h1>
        <p style={{
          color: theme.textSub, fontSize: '0.82rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300, marginBottom: '2rem'
        }}>
          {loading ? 'Scanning your URL against 70+ security engines...' : 'Analysis complete'}
        </p>

        {/* URL DISPLAY */}
        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 14, padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem'
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background: loading ? theme.warning : riskConfig[risk].color,
            boxShadow: `0 0 8px ${loading ? theme.warning : riskConfig[risk].color}`,
            animation: loading ? 'pulse 1.5s infinite' : 'none'
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: theme.text, fontSize: '0.82rem',
            wordBreak: 'break-all'
          }}>{url}</span>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{
            background: theme.bgCard,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: 20, padding: '5rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: 52, height: 52,
              border: `3px solid rgba(64,138,113,0.15)`,
              borderTop: `3px solid ${theme.green2}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem'
            }} />
            <p style={{
              fontFamily: 'Orbitron, sans-serif',
              color: theme.text, fontSize: '0.85rem',
              letterSpacing: '2px', marginBottom: '0.6rem'
            }}>Scanning</p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: theme.textSub, fontSize: '0.78rem',
              fontWeight: 300
            }}>This may take a few seconds</p>
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div style={{
            background: `rgba(248,113,113,0.08)`,
            border: `1px solid rgba(248,113,113,0.25)`,
            borderRadius: 16, padding: '2rem',
            textAlign: 'center'
          }}>
            <p style={{
              color: theme.danger,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.88rem', marginBottom: '1rem'
            }}>{error}</p>
            <button onClick={() => navigate('/')} style={{
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              color: theme.textSub,
              padding: '0.5rem 1.2rem',
              borderRadius: 8, fontSize: '0.78rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}>Try Again</button>
          </div>
        )}

        {/* RESULTS */}
        {!loading && !error && vtResult && (
          <>
            {/* MAIN RISK CARD */}
            <div style={{
              background: theme.bgCard,
              backdropFilter: 'blur(20px)',
              border: `2px solid ${riskConfig[risk].color}35`,
              borderRadius: 20, padding: '2.5rem',
              marginBottom: '1.5rem', textAlign: 'center',
              boxShadow: `0 0 50px ${riskConfig[risk].color}10`
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: `${riskConfig[risk].color}12`,
                border: `1px solid ${riskConfig[risk].color}35`,
                padding: '0.5rem 1.8rem',
                borderRadius: 999, marginBottom: '1rem'
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: riskConfig[risk].color,
                  boxShadow: `0 0 8px ${riskConfig[risk].color}`
                }} />
                <span style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: riskConfig[risk].color,
                  fontSize: '0.82rem', fontWeight: 700,
                  letterSpacing: '3px'
                }}>{riskConfig[risk].label}</span>
              </div>

              <p style={{
                color: theme.textSub,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.88rem', fontWeight: 300,
                lineHeight: 1.7
              }}>{riskConfig[risk].message}</p>
            </div>

            {/* STATS GRID */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem', marginBottom: '1.5rem'
            }}>
              {[
                ['Malicious',     vtResult.malicious,  theme.danger],
                ['Suspicious',    vtResult.suspicious, theme.warning],
                ['Harmless',      vtResult.harmless,   theme.safe],
                ['Total Engines', vtResult.total,      theme.textSub],
              ].map(([label, value, color]) => (
                <div key={label} className="result-card" style={{
                  background: theme.bgCard,
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${theme.border}`,
                  borderRadius: 16, padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '2.2rem', fontWeight: 700,
                    color, marginBottom: '0.5rem',
                    lineHeight: 1
                  }}>{value}</div>
                  <div style={{
                    color: theme.textSub, fontSize: '0.68rem',
                    textTransform: 'uppercase', letterSpacing: '1.5px',
                    fontFamily: 'Inter, sans-serif'
                  }}>{label}</div>
                </div>
              ))}
            </div>

            {/* VIRUSTOTAL DETAIL ROW */}
            <div className="result-card" style={{
              background: theme.bgCard,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: 16, padding: '1.5rem',
              marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: '1rem'
            }}>
              <div>
                <p style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: theme.text, fontSize: '0.78rem',
                  letterSpacing: '0.5px', marginBottom: '0.4rem'
                }}>VirusTotal Analysis</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: theme.textSub, fontSize: '0.8rem',
                  fontWeight: 300, lineHeight: 1.6
                }}>
                  {vtResult.malicious > 0
                    ? `${vtResult.malicious} out of ${vtResult.total} engines flagged this URL as malicious.`
                    : `All ${vtResult.total} engines returned clean results for this URL.`}
                </p>
              </div>
              <div style={{
                padding: '0.4rem 1.2rem',
                borderRadius: 999, flexShrink: 0,
                background: vtResult.malicious > 0 ? `${theme.danger}12` : `${theme.safe}12`,
                border: `1px solid ${vtResult.malicious > 0 ? theme.danger : theme.safe}35`,
                color: vtResult.malicious > 0 ? theme.danger : theme.safe,
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500
              }}>
                {vtResult.malicious > 0 ? 'Threat Found' : 'Clean'}
              </div>
            </div>

            {/* BREAKDOWN BAR */}
            <div style={{
              background: theme.bgCard,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: 16, padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontFamily: 'Orbitron, sans-serif',
                color: theme.text, fontSize: '0.75rem',
                letterSpacing: '0.5px', marginBottom: '1rem'
              }}>Engine Breakdown</p>

              {/* PROGRESS BAR */}
              <div style={{
                display: 'flex', borderRadius: 999,
                overflow: 'hidden', height: 10,
                marginBottom: '1rem',
                background: 'rgba(9,20,19,0.5)'
              }}>
                {vtResult.total > 0 && [
                  [vtResult.malicious,  theme.danger],
                  [vtResult.suspicious, theme.warning],
                  [vtResult.harmless,   theme.safe],
                  [vtResult.undetected, 'rgba(176,228,204,0.15)'],
                ].map(([val, color], i) => (
                  <div key={i} style={{
                    width: `${(val / vtResult.total) * 100}%`,
                    background: color,
                    transition: 'width 0.5s ease'
                  }} />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  ['Malicious',  vtResult.malicious,  theme.danger],
                  ['Suspicious', vtResult.suspicious, theme.warning],
                  ['Harmless',   vtResult.harmless,   theme.safe],
                  ['Undetected', vtResult.undetected, 'rgba(176,228,204,0.3)'],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', color: theme.textSub, fontSize: '0.75rem' }}>
                      {label} — <span style={{ color: theme.text, fontWeight: 500 }}>{val}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SCAN ANOTHER */}
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => navigate('/')} className="scan-btn" style={{
                background: theme.gradBtn,
                border: 'none', color: theme.text,
                padding: '0.85rem 2.5rem',
                borderRadius: 12, fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700, letterSpacing: '1.5px'
              }}>Scan Another URL</button>
            </div>
          </>
        )}

        {/* NO RESULT */}
        {!loading && !error && !vtResult && (
          <div style={{
            background: theme.bgCard,
            border: `1px solid ${theme.border}`,
            borderRadius: 16, padding: '3rem',
            textAlign: 'center'
          }}>
            <p style={{ color: theme.textSub, fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Could not retrieve scan results. Please check your API key.
            </p>
            <button onClick={() => navigate('/')} style={{
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              color: theme.textSub, padding: '0.5rem 1.2rem',
              borderRadius: 8, fontSize: '0.78rem',
              cursor: 'pointer', fontFamily: 'Inter, sans-serif'
            }}>Go Back</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Results