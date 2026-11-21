import { usePrompts } from '../context/PromptsContext'
import PromptCard from '../components/PromptCard'
import { useEffect } from 'react'

export default function AllPrompts() {
  const { prompts, loadPrompts, handleSubmit } = usePrompts()

  useEffect(() => {
    loadPrompts()
  }, [loadPrompts])

  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-4xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Historial</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Tus prompts guardados</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Revisa tus prompts anteriores, vuelve a ejecutar los mejores y guarda tus respuestas más valiosas.
            </p>
          </div>
        </div>

        <PromptCard prompts={prompts} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
