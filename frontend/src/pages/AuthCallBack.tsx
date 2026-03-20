import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      login(token)       // guarda el token
      navigate('/')      // redirige al home
    } else {
      navigate('/login') // algo salió mal
    }
  }, [])

  return <p className="text-white p-6">Iniciando sesión...</p>
}