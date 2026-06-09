import ResultsGrid from '../components/ResultsGrid'
import PromptInput from '../components/PromptInput'
import { usePrompts } from '../context/PromptsContext'

export default function Home() {
  const { handleSubmit, results } = usePrompts()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-4xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Tu espacio creativo</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Genera prompts, analiza resultados y guarda tu trabajo</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Usa PromptHub para crear mejores prompts con inteligencia artificial y conserva tus ideas en un espacio elegante y rápido.
            </p>
          </div>
        </div>

        <PromptInput onSubmit={handleSubmit} />
        <ResultsGrid results={results} />
      </div>
    </div>
  )
}
