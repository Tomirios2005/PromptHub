import ResultsGrid from '../components/ResultsGrid'
import PromptInput from '../components/PromptInput'
import { usePrompts } from '../context/PromptsContext'


export default function Home() {
  const { handleSubmit } = usePrompts()
  const { results} = usePrompts();

  
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">PromptHub</h1>
      <PromptInput onSubmit={handleSubmit} />
      <ResultsGrid results={results} />

    </div>
  )

}