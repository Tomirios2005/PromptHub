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
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl min-w-0 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          PromptHub
        </Link>

        <nav className="flex min-w-0 flex-wrap items-center gap-2">
          {isAuthenticated && links.map(({ to, label }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {label}
              </Link>
            )
          })}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}