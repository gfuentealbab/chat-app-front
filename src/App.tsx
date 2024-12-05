import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatError } from './types/chat';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { sendChatMessage } from './services/chatService';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Por favor escribe en pocas palabras tu consulta y así podré ayudarte mejor. ¿Cuál es tu pregunta?",
      isBot: true
    }
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(message);
      setMessages(prev => [...prev, { text: response.response, isBot: true }]);
    } catch (error) {
      const errorMessage = error instanceof ChatError 
        ? error.message 
        : "Hubo un error al conectar con el servidor.";
        
      setMessages(prev => [...prev, { 
        text: errorMessage,
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isOpen && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ChatHeader onClose={() => setIsOpen(false)} />
            
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;