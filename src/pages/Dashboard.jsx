import { useScan } from '../context/ScanContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import theme from '../theme'

function Dashboard() {
  const { scans } = useScan()

  const safe      = scans.filter(s => s.risk === 'safe').length
  const suspicious = scans.filter(s => s.risk === 'suspicious').length
  const dangerous = scans.filter(s => s.risk === 'dangerous').length

  const pieData = [
    { name: 'Safe',       value: safe,       color: theme.safe },
    { name: 'Suspicious', value: suspicious, color: theme.warning },
    { name: 'Dangerous',  value: dangerous,  color: theme.danger },
  ]

  // Scans per date for bar chart
  const dateMap = {}
  scans.forEach(s => {
    dateMap[s.date] = (dateMap[s.date] || 0) + 1
  })
  const barData = Object.entries(dateMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: theme.bgCard,
          border: `1px solid ${theme.border}`,
          borderRadius: 8, padding: '0.6rem 1rem',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.78rem', color: theme.text
        }}>
          {payload[0].name}: <strong>{payload[0].value}</strong>
        </div>
      )
    }
    return null
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.6, top: -100, right: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.4, bottom: -100, left: -100 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 5, padding: '3rem 4rem', maxWidth: 1000, margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: theme.green2, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '3px', fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem' }}>
            Overview
          </p>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: theme.text, fontSize: '1.8rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            Dashboard
          </h1>
          <p style={{ color: theme.textSub, fontSize: '0.82rem', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Summary of all your scan activity
          </p>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            ['Total Scans', scans.length, theme.text],
            ['Safe',        safe,         theme.safe],
            ['Suspicious',  suspicious,   theme.warning],
            ['Dangerous',   dangerous,    theme.danger],
          ].map(([label, value, color]) => (
            <div key={label} style={{
              background: theme.bgCard,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: 16, padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2.5rem', fontWeight: 700, color, marginBottom: '0.4rem', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ color: theme.textSub, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'Inter, sans-serif' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', marginBottom: '2rem' }}>

          {/* PIE CHART */}
          <div style={{
            background: theme.bgCard,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: 16, padding: '1.5rem'
          }}>
            <p style={{ fontFamily: 'Orbitron, sans-serif', color: theme.text, fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>
              Threat Distribution
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              {pieData.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                    <span style={{ color: theme.textSub, fontSize: '0.78rem', fontFamily: 'Inter, sans-serif' }}>{d.name}</span>
                  </div>
                  <span style={{ color: theme.text, fontSize: '0.78rem', fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BAR CHART */}
          <div style={{
            background: theme.bgCard,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: 16, padding: '1.5rem'
          }}>
            <p style={{ fontFamily: 'Orbitron, sans-serif', color: theme.text, fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>
              Scans Per Day
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} barSize={28}>
                <XAxis dataKey="date" tick={{ fill: theme.textSub, fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: theme.textSub, fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(64,138,113,0.08)' }} />
                <Bar dataKey="count" name="Scans" fill={theme.green2} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT SCANS */}
        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 16, overflow: 'hidden'
        }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: `1px solid ${theme.border}` }}>
            <p style={{ fontFamily: 'Orbitron, sans-serif', color: theme.text, fontSize: '0.78rem', letterSpacing: '0.5px' }}>
              Recent Scans
            </p>
          </div>

          {scans.slice(0, 5).map((scan) => (
            <div key={scan.id} style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.5rem',
              borderBottom: `1px solid rgba(64,138,113,0.08)`,
              transition: 'all 0.2s'
            }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: theme.textSub, fontSize: '0.78rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '1rem' }}>
                {scan.url}
              </span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: `${({ safe: theme.safe, suspicious: theme.warning, dangerous: theme.danger }[scan.risk])}12`,
                border: `1px solid ${{ safe: theme.safe, suspicious: theme.warning, dangerous: theme.danger }[scan.risk]}30`,
                padding: '0.25rem 0.7rem', borderRadius: 999
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: { safe: theme.safe, suspicious: theme.warning, dangerous: theme.danger }[scan.risk] }} />
                <span style={{ color: { safe: theme.safe, suspicious: theme.warning, dangerous: theme.danger }[scan.risk], fontSize: '0.68rem', fontFamily: 'Inter, sans-serif', textTransform: 'capitalize' }}>
                  {scan.risk}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard