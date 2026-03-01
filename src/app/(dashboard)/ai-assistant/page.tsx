import { Brain, Send } from 'lucide-react'

export default function AIAssistantPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">AI Assistant</h1>
        <p className="text-muted-foreground">Get personalized productivity insights and recommendations</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
        {/* Empty / welcome state */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-purple-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your AI Assistant</h2>
          <p className="text-muted-foreground max-w-sm text-sm">
            Ask me anything about your productivity, habits, or tasks. I can help you plan your day, analyze your progress, and suggest improvements.
          </p>
        </div>

        {/* Input area */}
        <div className="border-t border-border p-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask your AI assistant..."
              className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" />
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
