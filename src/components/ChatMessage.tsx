import React from 'react';
import { Bot, AlertCircle } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isError = message.isBot && message.text.toLowerCase().includes('error');

  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
      <div className="flex gap-2 max-w-[80%]">
        {message.isBot && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isError ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            {isError ? (
              <AlertCircle size={20} className="text-red-600" />
            ) : (
              <Bot size={20} className="text-blue-600" />
            )}
          </div>
        )}
        <div>
          <div className={`rounded-lg p-3 ${
            message.isBot 
              ? isError
                ? 'bg-red-50 text-red-800'
                : 'bg-gray-100 text-gray-800' 
              : 'bg-blue-600 text-white'
          }`}>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
}