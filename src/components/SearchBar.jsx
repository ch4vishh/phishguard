import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import theme from '../theme'

function SearchBar() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleScan = () => {
    if (input.trim()) {
      navigate(`/results/${encodeURIComponent(input)}`)
    }
  }

  return (
    <div style={{
      width: '100%', maxWidth: 640,
      background: theme.bgCard,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${theme.border}`,
      borderRadius: 24, padding: '2rem',
      boxShadow: `0 8px 40px rgba(9,20,19,0.6)`,
    }}>
      <span style={{
        color: theme.textSub, fontSize: '0.72rem',
        textTransform: 'uppercase', letterSpacing: '2px',
        marginBottom: '1rem', display: 'block',
        fontFamily: 'Inter, sans-serif'
      }}>Enter URL or Email to Scan</span>

      <div style={{
        display: 'flex', gap: '0.75rem',
        background: theme.bgInput,
        border: `1px solid ${theme.border}`,
        borderRadius: 14,
        padding: '0.5rem 0.5rem 0.5rem 1.2rem',
        alignItems: 'center', marginBottom: '1.2rem'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleScan()}
          placeholder="https://suspicious-site.com or user@email.com"
          style={{
            flex: 1, background: 'transparent',
            border: 'none', outline: 'none',
            color: theme.text,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem'
          }}
        />
        <button onClick={handleScan} style={{
          background: theme.gradBtn,
          border: 'none', color: theme.text,
          padding: '0.7rem 1.8rem', borderRadius: 10,
          fontSize: '0.8rem', cursor: 'pointer',
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700, letterSpacing: '1px',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s'
        }}>Scan Now</button>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        {[
          [theme.safe,    'Safe'],
          [theme.warning, 'Suspicious'],
          [theme.danger,  'Dangerous']
        ].map(([color, label]) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center',
            gap: '0.4rem', fontSize: '0.75rem',
            color: theme.textSub,
            fontFamily: 'Inter, sans-serif'
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: color,
              boxShadow: `0 0 6px ${color}`
            }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
