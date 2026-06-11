import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>🚀 CI/CD en action</div>
        <h1 style={styles.title}>CI Demo</h1>
        <p style={styles.subtitle}>
          Ce projet est déployé automatiquement via <strong>GitHub Actions</strong> à chaque Pull Request.
        </p>

        <div style={styles.counter}>
          <p style={styles.counterLabel}>Compteur de clics</p>
          <p style={styles.counterValue}>{count}</p>
          <button style={styles.button} onClick={() => setCount(c => c + 1)}>
            Cliquer ici
          </button>
        </div>

        <div style={styles.pipeline}>
          <h2 style={styles.pipelineTitle}>Pipeline CI/CD</h2>
          <div style={styles.steps}>
            {[
              { icon: '📝', label: 'Pull Request', desc: 'Tu ouvres une PR sur GitHub' },
              { icon: '⚙️', label: 'GitHub Actions', desc: 'Le workflow se déclenche' },
              { icon: '📦', label: 'Build', desc: 'npm install + npm run build' },
              { icon: '🚀', label: 'Deploy', desc: 'SSH vers la VM → fichiers copiés' },
            ].map((step, i) => (
              <div key={i} style={styles.step}>
                <div style={styles.stepIcon}>{step.icon}</div>
                <div style={styles.stepText}>
                  <strong>{step.label}</strong>
                  <span style={styles.stepDesc}>{step.desc}</span>
                </div>
                {i < 3 && <div style={styles.arrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: '2rem',
  },
  card: {
    background: '#1e293b',
    borderRadius: '16px',
    padding: '2.5rem',
    maxWidth: '720px',
    width: '100%',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
    border: '1px solid #334155',
  },
  badge: {
    display: 'inline-block',
    background: '#0ea5e9',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '99px',
    marginBottom: '1rem',
  },
  title: {
    color: '#f1f5f9',
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '0 0 0.5rem',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: '0 0 2rem',
  },
  counter: {
    background: '#0f172a',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
    border: '1px solid #334155',
  },
  counterLabel: {
    color: '#64748b',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    margin: '0 0 0.5rem',
  },
  counterValue: {
    color: '#0ea5e9',
    fontSize: '3rem',
    fontWeight: '800',
    margin: '0 0 1rem',
  },
  button: {
    background: '#0ea5e9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.6rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  pipeline: {
    background: '#0f172a',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #334155',
  },
  pipelineTitle: {
    color: '#f1f5f9',
    fontSize: '1rem',
    fontWeight: '700',
    margin: '0 0 1.2rem',
  },
  steps: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  stepIcon: {
    fontSize: '1.4rem',
    background: '#1e293b',
    borderRadius: '8px',
    padding: '6px',
  },
  stepText: {
    display: 'flex',
    flexDirection: 'column',
    color: '#cbd5e1',
    fontSize: '0.8rem',
  },
  stepDesc: {
    color: '#64748b',
    fontSize: '0.72rem',
    marginTop: '1px',
  },
  arrow: {
    color: '#334155',
    fontSize: '1.2rem',
    margin: '0 0.2rem',
  },
}
