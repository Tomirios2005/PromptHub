import { createContext, useContext, useState, type ReactNode } from 'react';
import { llmService } from '../service/promptService';

export interface ModelResult {
  model: string;
  response: string | null;
  loading: boolean;
  error: string | null;
  duration: number | null;
}
export interface Prompt{
    id: number;
    inputContext: string;
    createdAt?: string;
    responses?: PromptResponse[];
}
export interface PromptResponse {
    id: number;
    modelName: string;
    outputContent: string;
}

interface PromptsContextType {
  // Results
  results: ModelResult[];
  setResults: React.Dispatch<React.SetStateAction<ModelResult[]>>;
  clearResults: () => void;
  addResult: (result: ModelResult) => void;

  // Historial de prompts
  prompts: Prompt[];                    // lista de prompts anteriores
  setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
  currentPrompt: string;               // prompt actual en input
  setCurrentPrompt: React.Dispatch<React.SetStateAction<string>>;
  addPrompt: (prompt: string) => void;  // agregar al historial
  selectPrompt: (prompt: string) => void; // seleccionar uno y actualizar input
  loadPrompts: () => Promise<void>;
  clearPromptHistory: () => void;
  handleSubmit: (prompt: string) => Promise<void>

}

const PromptsContext = createContext<PromptsContextType | undefined>(undefined);

export function PromptsContextProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<ModelResult[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const MODELS = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'groq/compound', 'groq/compound-mini']

   const handleSubmit = async (prompt: string) => {
    const normalized = prompt.trim();
    if (!normalized) return;

    addPrompt(normalized);
    selectPrompt(normalized);

    // Inicializá todos los modelos en loading
    clearResults();
    const initialResults = (MODELS.map(model => ({ model, response: null, loading: true, error: null, duration: null })))
    setResults(initialResults);
    let idPrompt = -1;
    try {
      const data = await llmService.createPrompt(prompt);
      console.log('Prompt enviado, ID:', data);
      idPrompt = data;
    } catch (error) {
      console.error('Error al enviar el prompt:', error);
      setResults(MODELS.map(model => ({ model, response: null, loading: false, error: 'Error al enviar el prompt', duration: null })))
      return;
    }



    // Llamá a cada modelo en paralelo
    MODELS.forEach(async (model) => {
      const start = Date.now();

      try {

        const data = await llmService.generateForModel(idPrompt, model);
        const duration = ((Date.now() - start) / 1000).toFixed(1)

        setResults(prev =>
          prev.map(r => r.model === model ? { ...r, response: data.outputContent, loading: false, duration: parseFloat(duration) } : r)
        )
      } catch {
        setResults(prev =>
          prev.map(r => r.model === model ? { ...r, error: 'Error al obtener respuesta', loading: false, duration: null } : r)
        )
      }
    })
  }

  const clearResults = () => setResults([]);

  const addResult = (result: ModelResult) => {
    setResults((prev) => [...prev, result]);
  };

  const addPrompt = (prompt: string) => {
    const normalized = prompt.trim();
    if (!normalized) return;

    setCurrentPrompt(normalized);

    setPrompts((prev) => {
      const exists = prev.some((p) => p.inputContext === normalized);
      if (exists) return prev;

      const newPrompt: Prompt = {
        id: Date.now(),
        inputContext: normalized,
        createdAt: new Date().toLocaleString(),
      };

      return [newPrompt, ...prev];
    });
  };

  const selectPrompt = (prompt: string) => {
    const trimmed = prompt.trim();
    setCurrentPrompt(trimmed);
  };

  const loadPrompts = async () => {
    try {
      const data = await llmService.getPrompts();
      setPrompts(data);
    } catch (error) {
      console.error('Error al cargar prompts desde API:', error);
      setPrompts([]);
    }
  };
  

  const clearPromptHistory = () => {
    setPrompts([]);
    setCurrentPrompt('');
  };

  return (
    <PromptsContext.Provider
      value={{
        // Results
        results,
        setResults,
        clearResults,
        addResult,

        // Historial
        prompts,
        setPrompts,
        currentPrompt,
        setCurrentPrompt,
        addPrompt,
        selectPrompt,
        loadPrompts,
        clearPromptHistory,
        handleSubmit
      }}
    >
      {children}
    </PromptsContext.Provider>
  );
}

// Hook personalizado
export const usePrompts = () => {
  const context = useContext(PromptsContext);
  if (!context) {
    throw new Error('usePrompts debe usarse dentro de un PromptsContextProvider');
  }
  return context;
};