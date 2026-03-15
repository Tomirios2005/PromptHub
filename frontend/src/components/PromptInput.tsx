import { useState } from 'react'

interface Props {
  onSubmit: (prompt: string) => void
}

export default function PromptInput({ onSubmit }: Props) {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="max-w-3xl mx-auto mb-8 flex gap-3">
      <textarea
        className="flex-1 bg-gray-800 rounded-xl p-4 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribí tu prompt acá..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button
        onClick={() => prompt.trim() && onSubmit(prompt)}
        className="bg-blue-600 hover:bg-blue-500 px-6 rounded-xl font-semibold transition-colors"
      >
        Enviar
      </button>
    </div>
  )
}