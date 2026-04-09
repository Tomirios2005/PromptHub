import ReactMarkdown from "react-markdown";
import { usePrompts, type Prompt } from "../context/PromptsContext";
import { useNavigate } from "react-router-dom";
import { llmService } from "../service/promptService";
import { useState } from "react";

interface Props {
  prompts: Prompt[];
  onSubmit: (text: string) => void;
}

export default function PromptCard({ prompts, onSubmit }: Props) {
  const navigate = useNavigate();
  const { selectPrompt, setCurrentPrompt } = usePrompts();

  const [localPrompts, setLocalPrompts] = useState(prompts);

  if (localPrompts.length === 0) return null;

  const sortedPrompts = [...localPrompts].sort(
    (a, b) =>
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime(),
  );

  const handleDelete = async (id: number) => {
    try {
      await llmService.deleteResponse(id);

      setLocalPrompts((prev) =>
        prev.map((prompt) => ({
          ...prompt,
          responses: prompt.responses?.filter((r) => r.id !== id),
        }))
      );
    } catch (err) {
      console.error(err);
      alert("Error al borrar respuesta");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {sortedPrompts.map(({ id, inputContext, createdAt, responses }) => (
        <div
          key={id}
          className="bg-gray-800 rounded-xl p-5 hover:bg-gray-700 transition-colors"
        >
          {inputContext && (
            <div
              className="text-gray-100 prose prose-invert max-w-none cursor-pointer"
              onClick={() => {
                selectPrompt(inputContext);
                setCurrentPrompt(inputContext);
                onSubmit(inputContext);
                navigate("/");
              }}
            >
              <ReactMarkdown>{inputContext}</ReactMarkdown>
            </div>
          )}

          {responses?.map(({ id, modelName, outputContent }) => (
            <details
              key={id}
              className="mt-4 bg-gray-700 rounded-lg overflow-hidden relative"
            >
              <summary className="cursor-pointer p-3 text-blue-400 font-medium hover:bg-gray-600 transition flex justify-between items-center">
                <span>{modelName ?? "Respuesta sin modelo"}</span>
              </summary>

              <button
                onClick={() => handleDelete(id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-gray-600 px-2 py-1 rounded transition text-xs"
              >
                🗑
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