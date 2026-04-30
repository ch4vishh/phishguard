import { createContext, useContext, useState } from 'react'

const ScanContext = createContext()

export function ScanProvider({ children }) {
  const [scans, setScans] = useState([
    // dummy data so History and Dashboard are not empty
    {
      id: 1,
      url: 'https://suspicious-login-bank.com',
      risk: 'dangerous',
      malicious: 12,
      suspicious: 3,
      harmless: 45,
      total: 92,
      date: '2026-04-28'
    },
    {
      id: 2,
      url: 'https://www.youtube.com',
      risk: 'safe',
      malicious: 1,
      suspicious: 0,
      harmless: 80,
      total: 92,
      date: '2026-04-29'
    },
    {
      id: 3,
      url: 'https://free-iphone-winner.net',
      risk: 'dangerous',
      malicious: 18,
      suspicious: 5,
      harmless: 20,
      total: 92,
      date: '2026-04-29'
    },
    {
      id: 4,
      url: 'https://github.com',
      risk: 'safe',
      malicious: 0,
      suspicious: 0,
      harmless: 88,
      total: 92,
      date: '2026-04-30'
    },
    {
      id: 5,
      url: 'https://phishing-paypal-verify.com',
      risk: 'suspicious',
      malicious: 4,
      suspicious: 6,
      harmless: 55,
      total: 92,
      date: '2026-04-30'
    },
    {
      id: 6,
      url: 'https://google.com',
      risk: 'safe',
      malicious: 0,
      suspicious: 0,
      harmless: 90,
      total: 92,
      date: '2026-05-01'
    },
  ])

  const addScan = (scan) => {
    setScans(prev => [{
      id: Date.now(),
      ...scan,
      date: new Date().toISOString().split('T')[0]
    }, ...prev])
  }

  const deleteScan = (id) => {
    setScans(prev => prev.filter(s => s.id !== id))
  }

  return (
    <ScanContext.Provider value={{ scans, addScan, deleteScan }}>
      {children}
    </ScanContext.Provider>
  )
}

export function useScan() {
  return useContext(ScanContext)
}