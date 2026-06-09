import ReactMarkdown from 'react-markdown'

interface ModelResult {
  model: string
  response: string | null
  loading: boolean
  error: string | null
  duration: number | null
}

interface Props {
  results: ModelResult[]
}

export default function ResultsGrid({ results }: Props) {
  if (results.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
      {results.map(r => (
        <div key={r.model} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/20">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">{r.model}</h2>
            {r.duration && <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">{r.duration}s</span>}
          </div>

          {r.loading && <p className="text-slate-400 animate-pulse">Generando respuesta...</p>}
          {r.error && <p className="text-red-400">{r.error}</p>}

          {r.response && (
            <div className="text-slate-100 prose prose-invert max-w-none space-y-4">
              <ReactMarkdown>{r.response}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
