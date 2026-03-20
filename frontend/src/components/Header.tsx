import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { pathname } = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const links = [
    { to: '/', label: 'Generador' },
    { to: '/prompts', label: 'Mis prompts' },
  ]

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      height: '56px',
      borderBottom: '0.5px solid var(--color-border-tertiary)',
      background: 'var(--color-background-primary)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 500 }}>
        PromptHub
      </span>
      <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {isAuthenticated && links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontSize: '14px',
              padding: '6px 14px',
              borderRadius: 'var(--border-radius-md)',
              textDecoration: 'none',
              color: pathname === to ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              background: pathname === to ? 'var(--color-background-secondary)' : 'transparent',
              fontWeight: pathname === to ? 500 : 400,
            }}
          >
            {label}
          </Link>
        ))}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            style={{
              fontSize: '14px',
              padding: '6px 14px',
              borderRadius: 'var(--border-radius-md)',
              border: '0.5px solid var(--color-border-secondary)',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              marginLeft: '8px',
            }}
          >
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  )
}