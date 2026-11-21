import ReactMarkdown from "react-markdown"
import { usePrompts, type Prompt } from "../context/PromptsContext"
import { useNavigate } from "react-router-dom"
import { llmService } from "../service/promptService"
import { useState, useEffect } from "react"

interface Props {
  prompts: Prompt[]
  onSubmit: (text: string) => void
}

export default function PromptCard({ prompts, onSubmit }: Props) {
  const navigate = useNavigate()
  const { selectPrompt, setCurrentPrompt } = usePrompts()

  const [localPrompts, setLocalPrompts] = useState(prompts)

  useEffect(() => {
    setLocalPrompts(prompts)
  }, [prompts])

  if (localPrompts.length === 0) return null

  const sortedPrompts = [...localPrompts].sort(
    (a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime(),
  )

  const handleDelete = async (id: number) => {
    try {
      await llmService.deleteResponse(id)

      setLocalPrompts(prev =>
        prev.map(prompt => ({
          ...prompt,
          responses: prompt.responses?.filter(r => r.id !== id),
        })),
      )
    } catch (err) {
      console.error(err)
      alert("Error al borrar respuesta")
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
      {sortedPrompts.map(({ id, inputContext, createdAt, responses }) => (
        <article
          key={id}
          className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-500/20"
        >
          {inputContext && (
            <button
              type="button"
              onClick={() => {
                selectPrompt(inputContext)
                setCurrentPrompt(inputContext)
                onSubmit(inputContext)
                navigate("/")
              }}
              className="w-full text-left text-gray-100 prose prose-invert max-w-none transition hover:text-cyan-300"
            >
              <ReactMarkdown>{inputContext}</ReactMarkdown>
            </button>
          )}

          <div className="mt-6 space-y-4">
            {responses?.length ? (
              responses.map(({ id, modelName, outputContent }) => (
                <details
                  key={id}
                  className="rounded-3xl bg-slate-800/90 overflow-hidden border border-slate-700"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 text-sm font-medium text-cyan-300 transition hover:bg-slate-700">
                    <span>{modelName ?? "Respuesta sin modelo"}</span>
                    <span className="text-xs text-slate-400">Ver</span>
                  </summary>
                  <div className="border-t border-slate-700 p-4 text-slate-200">
                    {outputContent}
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      className="mt-4 rounded-full bg-slate-800 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </details>
              ))
            ) : (
              <p className="text-sm text-slate-400">No hay respuestas asociadas todavía.</p>
            )}
          </div>

          {createdAt && (
            <p className="mt-5 text-xs text-slate-500">Creado: {createdAt}</p>
          )}
        </article>
      ))}
    </div>
  )
}
