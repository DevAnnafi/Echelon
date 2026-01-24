"use server";

import { supabase } from "@/lib/supabaseClient";
import type { AIConversation, AIMessage, AIMode } from "@/types/ai";

/**
 * Get all AI conversations for a user
 */
export async function getConversations(userId: string): Promise<AIConversation[]> {
  const { data, error } = await supabase
    .from("ai_conversations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new AI conversation
 */
export async function createConversation(
  userId: string,
  title: string,
  mode: AIMode = "coach"
): Promise<AIConversation | null> {
  const { data, error } = await supabase
    .from("ai_conversations")
    .insert({
      user_id: userId,
      title,
      mode,
      messages: [],
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating conversation:", error);
    return null;
  }

  return data;
}

/**
 * Update conversation messages
 */
export async function updateConversationMessages(
  conversationId: string,
  messages: AIMessage[]
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("ai_conversations")
    .update({ messages, updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  if (error) {
    console.error("Error updating conversation:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete an AI conversation
 */
export async function deleteConversation(
  conversationId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("ai_conversations")
    .delete()
    .eq("id", conversationId);

  if (error) {
    console.error("Error deleting conversation:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get a single conversation by ID
 */
export async function getConversation(
  conversationId: string
): Promise<AIConversation | null> {
  const { data, error } = await supabase
    .from("ai_conversations")
    .select("*")
    .eq("id", conversationId)
    .single();

  if (error) {
    console.error("Error fetching conversation:", error);
    return null;
  }

  return data;
}