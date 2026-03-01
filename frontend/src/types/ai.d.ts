/**
 * AI-related types for Echelon
 */

export type AIMode = "coach" | "planner" | "analyst";

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  title: string;
  messages: AIMessage[];
  mode: AIMode;
  created_at: string;
  updated_at?: string;
}

export interface AIChatRequest {
  message: string;
  mode?: AIMode;
  conversationHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface AIChatResponse {
  response: string;
  error?: string;
}

export interface AIInsight {
  id: string;
  type: "productivity" | "habit" | "goal" | "recommendation";
  title: string;
  description: string;
  data?: Record<string, unknown>;
  created_at: string;
}