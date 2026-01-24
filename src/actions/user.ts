"use server";

import { supabase } from "@/lib/supabaseClient";
import type { UserProfile, UserStats } from "@/types/user";

/**
 * Get user profile by user ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string): Promise<UserStats | null> {
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("status")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(t => t.status === "completed").length || 0;
  const pendingTasks = tasks?.filter(t => t.status === "pending").length || 0;

  return {
    total_tasks: totalTasks,
    completed_tasks: completedTasks,
    pending_tasks: pendingTasks,
    current_streak: 0, // Would need habit tracking data
    longest_streak: 0,
    productivity_score: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
  };
}

/**
 * Delete user account and all associated data
 */
export async function deleteUserAccount(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  // Delete tasks
  await supabase.from("tasks").delete().eq("user_id", userId);
  
  // Delete AI conversations
  await supabase.from("ai_conversations").delete().eq("user_id", userId);
  
  // Delete user profile
  await supabase.from("user_profiles").delete().eq("user_id", userId);

  return { success: true };
}