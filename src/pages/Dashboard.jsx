import { useScan } from '../context/ScanContext'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import theme from '../theme'

function ShieldIcon({ size = 20, color = theme.green2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6V12C3 16.97 7.02 21.61 12 23C16.98 21.61 21 16.97 21 12V6L12 2Z"
        fill={`${color}25`} stroke={color} strokeWidth="1.5"/>
      <path d="M9 12L11 14L15 10" stroke={color}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Dashboard() {
  const { scans } = useScan()

  const safe       = scans.filter(s => s.risk === 'safe').length
  const suspicious = scans.filter(s => s.risk === 'suspicious').length
  const dangerous  = scans.filter(s => s.risk === 'dangerous').length

  const pieData = [
    { name: 'Safe',       value: safe,       color: theme.safe },
    { name: 'Suspicious', value: suspicious, color: theme.warning },
    { name: 'Dangerous',  value: dangerous,  color: theme.danger },
  ]

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

  const riskColor = {
    safe:       theme.safe,
    suspicious: theme.warning,
    dangerous:  theme.danger,
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: theme.bg }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${theme.green1},transparent)`, filter: 'blur(100px)', opacity: 0.6, top: -100, right: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${theme.green2},transparent)`, filter: 'blur(100px)', opacity: 0.4, bottom: -100, left: -100 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 5, padding: '3rem 4rem', maxWidth: 1000, margin: '0 auto' }}>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: theme.green2, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '3px', fontFamily: 'Inter, sans-serif', marginBottom: '0.5rem' }}>Overview</p>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: theme.text, fontSize: '1.8rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>Dashboard</h1>
          <p style={{ color: theme.textSub, fontSize: '0.82rem', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>Summary of all your scan activity</p>
        </div>

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
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
                <ShieldIcon size={24} color={color} />
              </div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2.2rem', fontWeight: 700, color, marginBottom: '0.4rem', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ color: theme.textSub, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'Inter, sans-serif' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: theme.bgCard,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: 16, padding: '2rem',
          marginBottom: '2rem'
        }}>
          <p style={{ fontFamily: 'Orbitron, sans-serif', color: theme.text, fontSize: '0.78rem', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>
            Threat Distribution
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {pieData.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: 'rgba(9,20,19,0.4)', borderRadius: 10, border: `1px solid ${theme.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldIcon size={18} color={d.color} />
                    <span style={{ color: theme.textSub, fontSize: '0.82rem', fontFamily: 'Inter, sans-serif' }}>{d.name}</span>
                  </div>
                  <span style={{ color: theme.text, fontSize: '0.85rem', fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
              padding: '1rem 1.5rem',
              borderBottom: `1px solid rgba(64,138,113,0.08)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, overflow: 'hidden' }}>
                <ShieldIcon size={18} color={riskColor[scan.risk]} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: theme.textSub, fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {scan.url}
                </span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: `${riskColor[scan.risk]}12`,
                border: `1px solid ${riskColor[scan.risk]}30`,
                padding: '0.25rem 0.8rem', borderRadius: 999,
                marginLeft: '1rem', flexShrink: 0
              }}>
                <span style={{ color: riskColor[scan.risk], fontSize: '0.68rem', fontFamily: 'Inter, sans-serif', textTransform: 'capitalize' }}>
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