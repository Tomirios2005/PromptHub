import ReactMarkdown from "react-markdown";
import { usePrompts, type Prompt } from "../context/PromptsContext";
import { useNavigate } from "react-router-dom";
import { llmService } from "../service/promptService";

interface Props {
  prompts: Prompt[];
  onSubmit: (text: string) => void;
}

export default function PromptCard({ prompts, onSubmit }: Props) {
  const navigate = useNavigate();
  const { selectPrompt, setCurrentPrompt } = usePrompts();

  if (prompts.length === 0) return null;
  prompts.sort(
    (a, b) =>
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime(),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {prompts.map(({ id, inputContext, createdAt, responses }) => (
        <div
          key={id}
          className="bg-gray-800 rounded-xl p-5 cursor-pointer hover:bg-gray-700 transition-colors"
          
        >
          {inputContext && (
            <div className="text-gray-100 prose prose-invert max-w-none"
            onClick={() => {
            if (!inputContext) return;
            selectPrompt(inputContext);
            setCurrentPrompt(inputContext);
            onSubmit(inputContext);
            navigate("/");
          }}>
              <ReactMarkdown>{inputContext}</ReactMarkdown>
            </div>
          )}
          {responses &&
            responses.map(({ id, modelName, outputContent }) => (
              
              <details
                key={id}
                className="mt-4 bg-gray-700 rounded-lg overflow-hidden"
              >
                <summary className="cursor-pointer p-3 text-blue-400 font-medium hover:bg-gray-600 transition">
                  {modelName?? "Respuesta sin modelo"}
                  
                </summary>
                <button
                    onClick={() => {llmService.deleteResponse(id);
                    }}
                  >
                    Delete
                  </button>

                <div className="p-3 border-t border-gray-600 text-gray-200">
                  {outputContent}
                </div>
              </details>
            ))}
          {createdAt && (
            <p className="text-xs text-gray-500 mt-3">⏱ {createdAt}s</p>
          )}
        </div>
      ))}
    </div>
  );
}
