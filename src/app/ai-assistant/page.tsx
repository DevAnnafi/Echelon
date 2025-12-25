// FILE: app/ai-assistant/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Send, Plus, Trash2, Check, Loader } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  user_id: string;
};

const quickPrompts = [
  "Plan my day",
  "Generate task ideas",
  "Motivate me",
  "Analyze my habits",
  "Help set goals",
];

const assistantModes = [
  { id: "coach", label: "Coach", description: "Motivational life coach" },
  { id: "planner", label: "Planner", description: "Strategic task planner" },
  { id: "analyst", label: "Analyst", description: "Data-driven insights" },
];

export default function AIAssistant() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState("coach");
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch user and conversations on mount
  useEffect(() => {
    const fetchUserAndConversations = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          setLoading(false);
          return;
        }
        setUser(user);

        // Fetch conversations from Supabase
        const { data, error } = await supabase
          .from("ai_conversations")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching conversations:", error);
        } else {
          setConversations(data || []);
          if (data && data.length > 0) {
            setCurrentConversation(data[0]);
            setMessages(JSON.parse(data[0].messages || "[]"));
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndConversations();
  }, []);

  // Create new conversation
  const createNewConversation = async () => {
    if (!user) return;

    const title = `Conversation ${new Date().toLocaleDateString()}`;
    const { data, error } = await supabase
      .from("ai_conversations")
      .insert([
        {
          user_id: user.id,
          title,
          messages: JSON.stringify([]),
          prompt: title,
          response: "",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating conversation:", error);
    } else {
      const newConversation: Conversation = {
        id: data.id,
        title: data.title,
        messages: [],
        created_at: data.created_at,
        user_id: data.user_id,
      };
      setConversations([newConversation, ...conversations]);
      setCurrentConversation(newConversation);
      setMessages([]);
    }
  };

  // Send message to AI
  const sendMessage = async (text: string = inputValue) => {
    if (!text.trim() || !currentConversation || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setSending(true);

    try {
      // Call your API endpoint or OpenAI directly
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          mode,
          conversationHistory: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Save to Supabase
      await supabase
        .from("ai_conversations")
        .update({
          messages: JSON.stringify(finalMessages),
          prompt: text,
          response: assistantMessage.content,
        })
        .eq("id", currentConversation.id);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
        timestamp: new Date(),
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  // Delete conversation
  const deleteConversation = async (id: string) => {
    const { error } = await supabase
      .from("ai_conversations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting conversation:", error);
    } else {
      const filtered = conversations.filter(c => c.id !== id);
      setConversations(filtered);
      if (currentConversation?.id === id) {
        setCurrentConversation(filtered[0] || null);
        setMessages(filtered[0] ? JSON.parse(filtered[0].messages || "[]") : []);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar - Conversations */}
      <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <Button
            onClick={createNewConversation}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => {
                setCurrentConversation(conv);
                setMessages(JSON.parse(conv.messages || "[]"));
              }}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentConversation?.id === conv.id
                  ? "bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {conv.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {new Date(conv.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with mode selector */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Assistant
            </h1>
            {currentConversation && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteConversation(currentConversation.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {assistantModes.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                  mode === m.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p className="text-slate-500 dark:text-slate-400 text-center">
                Start a conversation with your AI assistant
              </p>
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {quickPrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900 text-sm font-semibold transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === "Enter" && !sending && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={sending}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={sending || !inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}