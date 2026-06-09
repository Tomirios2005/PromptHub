import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/')
  }, [navigate])

  const handleGoogle = () => {
    window.location.href = 'https://prompthub-hzvg.onrender.com/oauth2/authorization/google'
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative w-full max-w-md rounded-4xl border border-white/10 bg-slate-950/90 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="space-y-6 text-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Bienvenido a PromptHub</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Crea prompts increíbles con tu cuenta de Google</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Inicia sesión para acceder a tus prompts guardados, ver resultados instantáneos y seguir creando con IA.
            </p>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full inline-flex items-center justify-center gap-3 rounded-3xl bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 shadow-lg shadow-cyan-500/10"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white text-sm font-bold">G</span>
            Entrar con Google
          </button>
        </div>
      </div>
    </div>
  )
}