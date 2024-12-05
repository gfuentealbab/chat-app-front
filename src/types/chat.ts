export interface Message {
  text: string;
  isBot: boolean;
  options?: string[];
}

export interface ChatResponse {
  response: string;
}

export class ChatError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ChatError';
  }
}