import theme from '../theme'

function Loader({ message = 'Loading' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '3rem', gap: '1.5rem'
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      `}</style>

      <div style={{
        width: 48, height: 48,
        border: `3px solid ${theme.border}`,
        borderTopColor: theme.green2,
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite'
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        color: theme.textSub,
        fontFamily: theme.fontMono,
        fontSize: '0.82rem',
        letterSpacing: '0.5px',
        animation: 'pulse 1.5s ease infinite'
      }}>
        {message}
        <span>…</span>
      </div>
    </div>
  )
}

export default Loader
