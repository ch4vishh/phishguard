const VT_API_KEY = import.meta.env.VITE_VT_API_KEY

export async function scanWithVirusTotal(url) {
  try {
    const submitRes = await fetch('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers: {
        'x-apikey': VT_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}`
    })

    const submitData = await submitRes.json()
    const scanId = submitData.data?.id

    if (!scanId) throw new Error('No scan ID')

    await new Promise(resolve => setTimeout(resolve, 3000))

    const resultRes = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${scanId}`,
      { headers: { 'x-apikey': VT_API_KEY } }
    )

    const resultData = await resultRes.json()
    const stats = resultData.data?.attributes?.stats

    return {
      malicious:  stats?.malicious  || 0,
      suspicious: stats?.suspicious || 0,
      harmless:   stats?.harmless   || 0,
      undetected: stats?.undetected || 0,
      total: Object.values(stats || {}).reduce((a, b) => a + b, 0)
    }

  } catch (error) {
    console.error('VirusTotal error:', error)
    return null
  }
}