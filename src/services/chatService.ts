import { API_CONFIG, getAuthHeader } from '../config/api';
import { ChatResponse, ChatError } from '../types/chat';

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST.TIMEOUT);

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT}`, {
      method: "POST",
      headers: {
        ...API_CONFIG.REQUEST.HEADERS,
        ...getAuthHeader()
      },
      body: JSON.stringify({ 
        input: message, 
        session_id: crypto.randomUUID() // Generate unique session ID per request
      }),
      signal: controller.signal,
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache',
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => null);
      throw new ChatError(
        `Error del servidor: ${response.status} ${response.statusText}`,
        response.status,
        errorText
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new ChatError('Respuesta del servidor en formato incorrecto');
    }

    const data = await response.json();
    if (!data || typeof data.response !== 'string') {
      throw new ChatError('Respuesta del servidor inválida');
    }

    return data;
  } catch (error) {
    if (error instanceof ChatError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ChatError('La solicitud ha tardado demasiado tiempo. Por favor, intenta nuevamente.');
    }
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new ChatError('Error de conexión. Por favor, verifica tu conexión a internet.');
    }
    
    console.error('Chat service error:', error);
    throw new ChatError('Error inesperado al procesar la solicitud. Por favor, intenta nuevamente.');
  }
}