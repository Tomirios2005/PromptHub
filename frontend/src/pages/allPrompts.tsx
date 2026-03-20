import { usePrompts, type Prompt } from '../context/PromptsContext';
import PromptCard from '../components/PromptCard';
import { useEffect } from 'react';


export default function AllPrompts() {
    const { prompts, loadPrompts, handleSubmit } = usePrompts();

    useEffect(() => {
        loadPrompts();
    }, [prompts.length]);



  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <PromptCard prompts={prompts} onSubmit={handleSubmit} />
    </div>
  )
}