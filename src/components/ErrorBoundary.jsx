import { Component } from 'react'
import theme from '../theme'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: theme.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{
            background: theme.bgCard,
            backdropFilter: 'blur(20px)',
            border: `1px solid rgba(248,113,113,0.3)`,
            borderRadius: 20,
            padding: '3rem',
            textAlign: 'center',
            maxWidth: 480
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 1.5rem' }}>
              <path d="M12 2L3 6V12C3 16.97 7.02 21.61 12 23C16.98 21.61 21 16.97 21 12V6L12 2Z"
                fill="rgba(248,113,113,0.15)" stroke="#F87171" strokeWidth="1.5"/>
              <path d="M12 8V12M12 16H12.01" stroke="#F87171"
                strokeWidth="1.5" strokeLinecap="round"/>
            </svg>

            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              color: theme.text, fontSize: '1rem',
              letterSpacing: '1px', marginBottom: '0.75rem'
            }}>Something went wrong</h2>

            <p style={{
              color: theme.textSub, fontSize: '0.82rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300, lineHeight: 1.7,
              marginBottom: '1.5rem'
            }}>
              An unexpected error occurred. Please refresh the page and try again.
            </p>

            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: theme.gradBtn,
                border: 'none', color: theme.text,
                padding: '0.7rem 1.8rem',
                borderRadius: 10, fontSize: '0.78rem',
                cursor: 'pointer',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700, letterSpacing: '1px'
              }}>
              Go Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary