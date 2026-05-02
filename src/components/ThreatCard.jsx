import theme from '../theme'

function ThreatCard({ risk, message }) {
  const riskConfig = {
    safe:      { color: theme.safe,    label: 'Safe' },
    suspicious:{ color: theme.warning, label: 'Suspicious' },
    dangerous: { color: theme.danger,  label: 'Dangerous' },
    unknown:   { color: theme.textSub, label: 'Unknown' },
  }

  const config = riskConfig[risk] || riskConfig.unknown

  return (
    <div style={{
      background: theme.bgCard,
      backdropFilter: 'blur(20px)',
      border: `2px solid ${config.color}35`,
      borderRadius: 20, padding: '2.5rem',
      textAlign: 'center',
      boxShadow: `0 0 50px ${config.color}10`
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
        background: `${config.color}12`,
        border: `1px solid ${config.color}35`,
        padding: '0.5rem 1.8rem',
        borderRadius: 999, marginBottom: '1rem'
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: config.color,
          boxShadow: `0 0 8px ${config.color}`
        }} />
        <span style={{
          fontFamily: 'Orbitron, sans-serif',
          color: config.color,
          fontSize: '0.82rem', fontWeight: 700,
          letterSpacing: '3px'
        }}>{config.label}</span>
      </div>

      <p style={{
        color: theme.textSub,
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.88rem', fontWeight: 300,
        lineHeight: 1.7
      }}>{message}</p>
    </div>
  )
}

export default ThreatCard