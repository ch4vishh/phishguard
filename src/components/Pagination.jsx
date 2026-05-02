import theme from '../theme'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            width: 36, height: 36,
            background: p === currentPage ? 'rgba(64,138,113,0.2)' : 'transparent',
            border: `1px solid ${p === currentPage ? theme.green2 : theme.border}`,
            borderRadius: 8,
            color: p === currentPage ? theme.text : theme.textSub,
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem', cursor: 'pointer',
            fontWeight: p === currentPage ? 700 : 400,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => {
            if (p !== currentPage) {
              e.currentTarget.style.borderColor = 'rgba(64,138,113,0.5)'
              e.currentTarget.style.color = theme.text
            }
          }}
          onMouseLeave={e => {
            if (p !== currentPage) {
              e.currentTarget.style.borderColor = theme.border
              e.currentTarget.style.color = theme.textSub
            }
          }}
        >{p}</button>
      ))}
    </div>
  )
}

export default Pagination