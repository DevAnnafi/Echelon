'use client';
import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<{role: string; content: string}[]>([
    { role: 'assistant', content: 'Hello! I\'m your Echelon AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    // TODO: Connect to OpenAI API route
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'AI integration coming soon! This will connect to the OpenAI API.' }]);
    }, 500);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">AI Assistant</h1>
        <p className="text-gray-400 mb-8">Your intelligent productivity coach</p>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-200'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-700 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask anything..." className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={handleSend} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
