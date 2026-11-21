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
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {results.map(r => (
        <div key={r.model} className="min-w-0 overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/20">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="min-w-0 break-all font-mono text-sm uppercase tracking-wide text-cyan-300">{r.model}</h2>
            {r.duration && <span className="shrink-0 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">{r.duration}s</span>}
          </div>

          {r.loading && <p className="text-slate-400 animate-pulse">Generando respuesta...</p>}
          {r.error && <p className="text-red-400">{r.error}</p>}

          {r.response && (
            <div className="max-w-full space-y-4 break-words text-slate-100 prose prose-invert">
              <ReactMarkdown>{r.response}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
