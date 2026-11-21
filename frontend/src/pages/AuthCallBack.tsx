import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const error = params.get('error')

    if (error) {
      console.error('Error en autenticación:', error)
      window.location.href = 'https://prompthub-hzvg.onrender.com/oauth2/authorization/google'
      return
    }

    if (token) {
      login(token)
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [login, navigate])

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30">
            <div className="h-12 w-12 rounded-full border-4 border-white border-t-transparent animate-spin" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-white">Autenticando tu sesión</h1>
            <p className="mt-3 text-base leading-7 text-slate-300">
              Estamos verificando tu cuenta de Google y preparándote acceso al panel.
              No cierres esta ventana.
            </p>
          </div>

          <div className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-left">
            <p className="text-sm text-slate-400">
              Si la redirección no ocurre automáticamente en unos segundos, recarga la página o vuelve a intentar iniciar sesión.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}