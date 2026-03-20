import ReactMarkdown from 'react-markdown'
import { usePrompts, type Prompt } from '../context/PromptsContext'
import { useNavigate } from 'react-router-dom'


interface Props {
  prompts: Prompt[]
  onSubmit: (text: string) => void
}

export default function PromptCard({ prompts, onSubmit }: Props) {
  const navigate = useNavigate();
  const { selectPrompt, setCurrentPrompt } = usePrompts();

  if (prompts.length === 0) return null
  prompts.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {prompts.map(({ id, inputContext, createdAt }) => (
        <div
          key={id}
          className="bg-gray-800 rounded-xl p-5 cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={() => {
            if (!inputContext) return;
            selectPrompt(inputContext);
            setCurrentPrompt(inputContext);
            onSubmit(inputContext);
            navigate('/');
          }}

        >
          {inputContext && (
            <div className="text-gray-100 prose prose-invert max-w-none">
              <ReactMarkdown>{inputContext}</ReactMarkdown>
            </div>
          )}
          {createdAt && (
            <p className="text-xs text-gray-500 mt-3">⏱ {createdAt}s</p>
          )}
        </div>
      ))}
    </div>
  )
}