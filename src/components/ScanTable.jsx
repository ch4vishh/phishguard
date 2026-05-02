import { useNavigate } from 'react-router-dom'
import theme from '../theme'

function ScanTable({ scans, onDelete }) {
  const navigate = useNavigate()

  const riskColor = {
    safe:       theme.safe,
    suspicious: theme.warning,
    dangerous:  theme.danger,
  }

  return (
    <div style={{
      background: theme.bgCard,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${theme.border}`,
      borderRadius: 16, overflow: 'hidden'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.5fr',
        padding: '0.9rem 1.5rem',
        borderBottom: `1px solid ${theme.border}`,
        background: 'rgba(9,20,19,0.4)'
      }}>
        {['URL', 'Risk', 'Malicious', 'Total', 'Date', ''].map((h) => (
          <div key={h} style={{
            color: theme.textSub, fontSize: '0.68rem',
            textTransform: 'uppercase', letterSpacing: '1.5px',
            fontFamily: 'Inter, sans-serif', fontWeight: 500
          }}>{h}</div>
        ))}
      </div>

      {scans.length === 0 ? (
        <div style={{
          padding: '3rem', textAlign: 'center',
          color: theme.textSub,
          fontFamily: 'Inter, sans-serif', fontSize: '0.85rem'
        }}>
          No scans found
        </div>
      ) : (
        scans.map((scan) => (
          <div key={scan.id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.5fr',
            padding: '1rem 1.5rem',
            borderBottom: `1px solid rgba(64,138,113,0.08)`,
            alignItems: 'center',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(64,138,113,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span
              onClick={() => navigate(`/results/${encodeURIComponent(scan.url)}`)}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: theme.textSub, fontSize: '0.75rem',
                overflow: 'hidden', textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', paddingRight: '1rem',
                cursor: 'pointer', transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = theme.text}
              onMouseLeave={e => e.currentTarget.style.color = theme.textSub}
            >{scan.url}</span>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: `${riskColor[scan.risk]}12`,
              border: `1px solid ${riskColor[scan.risk]}30`,
              padding: '0.3rem 0.7rem',
              borderRadius: 999, width: 'fit-content'
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: riskColor[scan.risk] }} />
              <span style={{
                color: riskColor[scan.risk], fontSize: '0.7rem',
                fontFamily: 'Inter, sans-serif', textTransform: 'capitalize'
              }}>{scan.risk}</span>
            </div>

            <span style={{
              color: scan.malicious > 0 ? theme.danger : theme.safe,
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.85rem', fontWeight: 700
            }}>{scan.malicious}</span>

            <span style={{
              color: theme.textSub,
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem'
            }}>{scan.total}</span>

            <span style={{
              color: theme.textSub,
              fontFamily: 'Inter, sans-serif', fontSize: '0.78rem'
            }}>{scan.date}</span>

            <button
              onClick={() => onDelete(scan.id)}
              style={{
                background: 'transparent', border: 'none',
                color: theme.textSub, cursor: 'pointer',
                fontSize: '1rem', padding: '0.2rem',
                transition: 'all 0.2s', opacity: 0.4
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = theme.danger }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.4; e.currentTarget.style.color = theme.textSub }}
            >✕</button>
          </div>
        ))
      )}
    </div>
  )
}

export default ScanTable