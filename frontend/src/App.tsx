import PromptInput from './components/PromptInput'
import ResultsGrid from './components/ResultsGrid'
import { useState } from 'react'

interface ModelResult {
  model: string
  response: string | null
  loading: boolean
  error: string | null
  duration: number | null
}

const MODELS = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'groq/compound', 'groq/compound-mini']
const url='http://localhost:8080/api/'

function App() {
  const [results, setResults] = useState<ModelResult[]>([])

  const handleSubmit = async (prompt: string) => {
    // Inicializá todos los modelos en loading
    setResults(MODELS.map(model => ({ model, response: null, loading: true, error: null, duration: null })))
    let idPrompt=-1;
    try {
      const res = await fetch(`${url}prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'inputContext':prompt })
      })
      const data = await res.json()
      console.log('Prompt enviado, ID:', data.id);
      idPrompt=data.id;
    } catch (error) {
      console.error('Error al enviar el prompt:', error);
      setResults(MODELS.map(model => ({ model, response: null, loading: false, error: 'Error al enviar el prompt', duration:null })))
      return;
    }



    // Llamá a cada modelo en paralelo
    MODELS.forEach(async (model) => {
      const start=Date.now();

      try {
        const res = await fetch(`${url}prompts/${idPrompt}/generate?modelName=${model}`, {
          method: 'GET',
        })
        const data = await res.json()
        const duration = ((Date.now() - start) / 1000).toFixed(1)

        setResults(prev =>
          prev.map(r => r.model === model ? { ...r, response: data.outputContent, loading: false, duration: parseFloat(duration) } : r)
        )
      } catch {
        setResults(prev =>
          prev.map(r => r.model === model ? { ...r, error: 'Error al obtener respuesta', loading: false, duration:null } : r)
        )
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">PromptHub</h1>
      <PromptInput onSubmit={handleSubmit} />
      <ResultsGrid results={results} />
    </div>
  )
}

export default App