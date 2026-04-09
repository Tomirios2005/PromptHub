import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/')  // 👈 si ya tiene token, va al home
  }, [])

  const handleGoogle = () => {
    window.location.href = 'https://prompthub-hzvg.onrender.com/oauth2/authorization/google'
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">PromptHub</h1>
        <button
          onClick={handleGoogle}
          className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          Entrar con Google
        </button>
      </div>
    </div>
  )
}