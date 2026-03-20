import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PromptsContextProvider } from './context/PromptsContext.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
<PromptsContextProvider>
      <App />
    </PromptsContextProvider>
      </StrictMode>,
)
