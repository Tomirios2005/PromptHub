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
import ReactMarkdown from 'react-markdown'


export default function ResultsGrid({ results }: Props) {
  if (results.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {results.map(r => (
        <div key={r.model} className="bg-gray-800 rounded-xl p-5">
          <h2 className="font-mono text-sm text-blue-400 mb-3">{r.model}</h2>
          {r.loading && <p className="text-gray-400 animate-pulse">Generando respuesta...</p>}
          {r.error && <p className="text-red-400">{r.error}</p>}
          {r.response && (
            <div className="text-gray-100 prose prose-invert max-w-none">
              <ReactMarkdown>{r.response}</ReactMarkdown>
            </div>
          )} 
          {r.duration && (
  <p className="text-xs text-gray-500 mt-3">⏱ {r.duration}s</p>
)}       </div>
      ))}
    </div>
  )
}