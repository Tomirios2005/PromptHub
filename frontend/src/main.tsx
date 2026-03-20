import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PromptsContextProvider } from './context/PromptsContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
<PromptsContextProvider>
      <App />
    </PromptsContextProvider>
      </StrictMode>,
)
