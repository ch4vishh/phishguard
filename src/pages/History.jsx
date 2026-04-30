import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/ScanContext'
import theme from '../theme'

const ITEMS_PER_PAGE = 5

function History() {
  const { scans, deleteScan } = useScan()
  const navigate = useNavigate()

  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [sort, setSort]       = useState('newest')
  const [page, setPage]       = useState(1)

  // SEARCH
  const searched = scans.filter(s =>
    s.url.toLowerCase().includes(search.toLowerCase())
  )

  // FILTER
  const filtered = filter === 'all'
    ? searched
    : searched.filter(s => s.risk === filter)

  // SORT
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'newest') return b.id - a.id
    if (sort === 'oldest') return a.id - b.id
    if (sort === 'dangerous') return b.malicious - a.malicious
    return 0
  })

  // PAGINATION
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginated  = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const riskColor = {
    safe:      theme.safe,
    suspicious: theme.warning,
    dangerous: theme.danger,
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.6, top: -100, right: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.4, bottom: -100, left: -100 }} />
      </div>

      <style>{`
        .row-hover { transition: all 0.2s ease; }
        .row-hover:hover { background: rgba(64,138,113,0.08) !important; }
        .del-btn { transition: all 0.2s ease; opacity: 0.4; }
        .del-btn:hover { opacity: 1 !important; color: ${theme.danger} !important; }
        .page-btn { transition: all 0.2s ease; }
        .page-btn:hover { border-color: rgba(64,138,113,0.5) !important; color: ${theme.text} !important; }
        .filter-btn { transition: all 0.2s ease; cursor: pointer; }
        .search-input::placeholder { color: rgba(176,228,204,0.3); }
        .scan-url { transition: all 0.2s ease; }
        .scan-url:hover { color: ${theme.text} !important; text-decoration: underline; cursor: pointer; }
      `}</style>

      <div style={{ position: 'relative', zIndex: 5, padding: '3rem 4rem', maxWidth: 1000, margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: theme.green2, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '3px', fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem' }}>
            Scan History
          </p>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: theme.text, fontSize: '1.8rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            All Scans
          </h1>
          <p style={{ color: theme.textSub, fontSize: '0.82rem', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            {scans.length} total scans recorded
          </p>
        </div>

        {/* SEARCH + FILTER + SORT */}
        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 16, padding: '1.2rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex', gap: '1rem',
          flexWrap: 'wrap', alignItems: 'center'
        }}>
          {/* SEARCH */}
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
              fontSize: '0.8rem', outline: 'none'
            }}
          />

          {/* FILTER */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'safe', 'suspicious', 'dangerous'].map((f) => (
              <div key={f} className="filter-btn"
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

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
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

        {/* TABLE */}
        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 16, overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>

          {/* TABLE HEADER */}
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

          {/* TABLE ROWS */}
          {paginated.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: theme.textSub, fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
              No scans found
            </div>
          ) : (
            paginated.map((scan) => (
              <div key={scan.id} className="row-hover" style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.5fr',
                padding: '1rem 1.5rem',
                borderBottom: `1px solid rgba(64,138,113,0.08)`,
                alignItems: 'center'
              }}>
                {/* URL */}
                <span
                  className="scan-url"
                  onClick={() => navigate(`/results/${encodeURIComponent(scan.url)}`)}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    color: theme.textSub, fontSize: '0.75rem',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', paddingRight: '1rem'
                  }}>
                  {scan.url}
                </span>

                {/* RISK BADGE */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: `${riskColor[scan.risk]}12`,
                  border: `1px solid ${riskColor[scan.risk]}30`,
                  padding: '0.3rem 0.7rem',
                  borderRadius: 999, width: 'fit-content'
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: riskColor[scan.risk] }} />
                  <span style={{ color: riskColor[scan.risk], fontSize: '0.7rem', fontFamily: 'Inter, sans-serif', textTransform: 'capitalize' }}>
                    {scan.risk}
                  </span>
                </div>

                {/* MALICIOUS */}
                <span style={{ color: scan.malicious > 0 ? theme.danger : theme.safe, fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700 }}>
                  {scan.malicious}
                </span>

                {/* TOTAL */}
                <span style={{ color: theme.textSub, fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>
                  {scan.total}
                </span>

                {/* DATE */}
                <span style={{ color: theme.textSub, fontFamily: 'Inter, sans-serif', fontSize: '0.78rem' }}>
                  {scan.date}
                </span>

                {/* DELETE */}
                <button
                  className="del-btn"
                  onClick={() => deleteScan(scan.id)}
                  style={{
                    background: 'transparent', border: 'none',
                    color: theme.textSub, cursor: 'pointer',
                    fontSize: '1rem', padding: '0.2rem'
                  }}>
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className="page-btn"
                onClick={() => setPage(p)}
                style={{
                  width: 36, height: 36,
                  background: p === page ? 'rgba(64,138,113,0.2)' : 'transparent',
                  border: `1px solid ${p === page ? theme.green2 : theme.border}`,
                  borderRadius: 8, color: p === page ? theme.text : theme.textSub,
                  fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem',
                  cursor: 'pointer', fontWeight: p === page ? 700 : 400
                }}>
                {p}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default History