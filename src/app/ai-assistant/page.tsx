"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Send, Plus, Trash2, Loader } from "lucide-react";

/* =======================
   Types
======================= */

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ISO string (Supabase-safe)
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  user_id: string;
};

/* =======================
   Constants
======================= */

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

/* =======================
   Component
======================= */

export default function AIAssistant() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState("coach");
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* =======================
     Effects
  ======================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("ai_conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data?.length) {
        setConversations(data);
        setCurrentConversation(data[0]);
        setMessages(data[0].messages ?? []);
      }

      setLoading(false);
    };

    init();
  }, []);

  /* =======================
     Actions
  ======================= */

  const createNewConversation = async () => {
    if (!user) return;

    const title = `Conversation ${new Date().toLocaleDateString()}`;

    const { data, error } = await supabase
      .from("ai_conversations")
      .insert({
        user_id: user.id,
        title,
        messages: [],
      })
      .select()
      .single();

    if (error || !data) return;

    const newConv: Conversation = {
      id: data.id,
      title: data.title,
      messages: [],
      created_at: data.created_at,
      user_id: data.user_id,
    };

    setConversations(prev => [newConv, ...prev]);
    setCurrentConversation(newConv);
    setMessages([]);
  };

  const sendMessage = async (text: string = inputValue) => {
    if (!text.trim() || !currentConversation || !user) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setSending(true);

    try {
      const res = await fetch("/api/ai-chat", {
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

      const data = await res.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response ?? "Something went wrong.",
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      await supabase
        .from("ai_conversations")
        .update({ messages: finalMessages })
        .eq("id", currentConversation.id);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Failed to process request.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const deleteConversation = async (id: string) => {
    await supabase.from("ai_conversations").delete().eq("id", id);

    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    setCurrentConversation(filtered[0] ?? null);
    setMessages(filtered[0]?.messages ?? []);
  };

  /* =======================
     Render
  ======================= */

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-4 border-b">
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
                setMessages(conv.messages ?? []);
              }}
              className={`p-3 rounded-lg cursor-pointer ${
                currentConversation?.id === conv.id
                  ? "bg-blue-100 dark:bg-blue-950"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <p className="text-sm font-semibold truncate">{conv.title}</p>
              <p className="text-xs opacity-60">
                {new Date(conv.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex justify-between">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
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

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 dark:bg-slate-800"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Thinking…
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 flex gap-2">
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-2 rounded-lg border"
            placeholder="Ask me anything…"
            disabled={sending}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={sending || !inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
