import { usePrompts } from '../context/PromptsContext'

interface Props {
  onSubmit: (prompt: string) => void
}

export default function PromptInput({ onSubmit }: Props) {
  const { currentPrompt, setCurrentPrompt } = usePrompts()

  return (
    <div className="max-w-4xl mx-auto mb-10 rounded-4xl border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row">
        <textarea
          className="h-36 flex-1 rounded-3xl border border-slate-800 bg-slate-900/90 p-5 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          placeholder="Escribí tu prompt acá..."
          value={currentPrompt}
          onChange={e => setCurrentPrompt(e.target.value)}
        />
        <button
          onClick={() => currentPrompt.trim() && onSubmit(currentPrompt)}
          className="inline-flex h-14 items-center justify-center rounded-3xl bg-linear-to-r from-cyan-500 to-blue-500 px-8 text-sm font-semibold text-slate-950 transition hover:brightness-110"
        >
          Enviar prompt
        </button>
      </div>
    </div>
  )
}
