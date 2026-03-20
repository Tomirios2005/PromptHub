const API_URL = 'https://prompthub-hzvg.onrender.com';   // ← tu backend

export interface CompareRequest {
  prompt: string;
}

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
})


export const llmService = {
  /** Envía el prompt y devuelve el ID */
  async createPrompt(prompt: string): Promise<number> {
    const res = await fetch(`${API_URL}/prompts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ inputContext: prompt }),
    });

    if (!res.ok) throw new Error('Error al crear prompt');
    const data = await res.json();
    return data.id;
  },

  /** Genera respuesta de UN modelo */
  async generateForModel(promptId: number, modelName: string): Promise<{
    outputContent: string;
  }> {
    const res = await fetch(
      `${API_URL}/prompts/${promptId}/generate?modelName=${encodeURIComponent(modelName)}`,
      { method: 'GET',
        headers: getHeaders()
        
       }
    );

    if (!res.ok) throw new Error(`Error con modelo ${modelName}`);
    return res.json();
  },

  async getPrompts() {
    const res = await fetch(`${API_URL}/prompts`, { method: 'GET',
      headers: getHeaders()
     });
    if (!res.ok) throw new Error('Error al obtener prompts');
    return res.json();
  }
};