import React from 'react';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-blue-600 p-4 flex justify-between items-center">
      <h2 className="text-white font-semibold text-lg">Asistente Ayuda</h2>
      <button 
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
}