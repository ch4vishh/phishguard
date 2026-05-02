import { useState } from 'react'
import { useScan } from '../context/ScanContext'
import ScanTable from '../components/ScanTable'
import Pagination from '../components/Pagination'
import theme from '../theme'

const ITEMS_PER_PAGE = 5

function History() {
  const { scans, deleteScan } = useScan()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort]     = useState('newest')
  const [page, setPage]     = useState(1)

  const searched = scans.filter(s =>
    s.url.toLowerCase().includes(search.toLowerCase())
  )

  const filtered = filter === 'all'
    ? searched
    : searched.filter(s => s.risk === filter)

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'newest')    return b.id - a.id
    if (sort === 'oldest')    return a.id - b.id
    if (sort === 'dangerous') return b.malicious - a.malicious
    return 0
  })

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginated  = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.6, top: -100, right: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.4, bottom: -100, left: -100 }} />
      </div>

      <style>{`
        .search-input::placeholder { color: rgba(176,228,204,0.3); }
        .search-input:focus { border-color: rgba(64,138,113,0.6) !important; outline: none; }
        .filter-btn { transition: all 0.2s ease; cursor: pointer; }
        .filter-btn:hover { border-color: rgba(64,138,113,0.4) !important; color: ${theme.text} !important; }
      `}</style>

      <div style={{ position: 'relative', zIndex: 5, padding: '3rem 4rem', maxWidth: 1000, margin: '0 auto' }}>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            color: theme.green2, fontSize: '0.72rem',
            textTransform: 'uppercase', letterSpacing: '3px',
            fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem'
          }}>Scan History</p>

          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: theme.text, fontSize: '1.8rem',
            letterSpacing: '1px', marginBottom: '0.5rem'
          }}>All Scans</h1>

          <p style={{
            color: theme.textSub, fontSize: '0.82rem',
            fontFamily: 'Inter, sans-serif', fontWeight: 300
          }}>
            {scans.length} total scans recorded
          </p>
        </div>

        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 16, padding: '1.2rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex', gap: '1rem',
          flexWrap: 'wrap', alignItems: 'center'
        }}>

          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by URL..."
            className="search-input"
            style={{
              flex: 1, minWidth: 200,
              background: theme.bgInput,
              border: `1px solid ${theme.border}`,
              borderRadius: 8, padding: '0.6rem 1rem',
              color: theme.text,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              transition: 'all 0.2s'
            }}
          />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'safe', 'suspicious', 'dangerous'].map((f) => (
              <div
                key={f}
                className="filter-btn"
                onClick={() => { setFilter(f); setPage(1) }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 8, fontSize: '0.72rem',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'capitalize',
                  border: `1px solid ${filter === f ? theme.green2 : theme.border}`,
                  background: filter === f ? 'rgba(64,138,113,0.15)' : 'transparent',
                  color: filter === f ? theme.text : theme.textSub,
                  fontWeight: filter === f ? 500 : 400
                }}>
                {f}
              </div>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1) }}
            style={{
              background: theme.bgInput,
              border: `1px solid ${theme.border}`,
              borderRadius: 8, padding: '0.6rem 1rem',
              color: theme.text,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem', outline: 'none',
              cursor: 'pointer'
            }}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="dangerous">Most Dangerous</option>
          </select>
        </div>

        <ScanTable scans={paginated} onDelete={deleteScan} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />

      </div>
    </div>
  )
}

export default History