import theme from '../theme'
import { useParams } from 'react-router-dom'
function Results() {
  const { id } = useParams()
  return (
    <div style={{ background: theme.bg, minHeight: '100vh', color: theme.text, padding: '3rem', fontFamily: 'Orbitron, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Scan Results</h1>
      <p style={{ color: theme.textSub, fontFamily: 'Inter, sans-serif' }}>Scanning: {decodeURIComponent(id)}</p>
    </div>
  )
}
export default Results