import type { ReactNode } from 'react'
import Home  from "./pages/home"
import AllPrompts from "./pages/allPrompts"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Header from "./components/Header"
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthCallback from './pages/AuthCallBack'






function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}


function App() {
 
  return (
  <>
  

  <BrowserRouter>
      <AuthProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/prompts" element={<PrivateRoute><AllPrompts /></PrivateRoute>} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>

  </>
  )

  
}

export default App