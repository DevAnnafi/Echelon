"use server";

import { supabase } from "@/lib/supabaseClient";
import type { Task, Project, TaskFilters, TaskSortOptions } from "@/types/project";

/**
 * Get all tasks for a user with optional filters
 */
export async function getTasks(
  userId: string,
  filters?: TaskFilters,
  sort?: TaskSortOptions
): Promise<Task[]> {
  let query = supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.priority) {
    query = query.eq("priority", filters.priority);
  }
  if (filters?.project_id) {
    query = query.eq("project_id", filters.project_id);
  }
  if (filters?.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }
  if (filters?.due_before) {
    query = query.lte("due_date", filters.due_before);
  }
  if (filters?.due_after) {
    query = query.gte("due_date", filters.due_after);
  }

  const sortField = sort?.field || "created_at";
  const sortDirection = sort?.direction === "asc";
  query = query.order(sortField, { ascending: sortDirection });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new task
 */
export async function createTask(
  userId: string,
  task: Omit<Task, "id" | "user_id" | "created_at" | "updated_at">
): Promise<Task | null> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userId,
      ...task,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    return null;
  }

  return data;
}

/**
 * Update a task
 */
export async function updateTask(
  taskId: string,
  updates: Partial<Task>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("tasks")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", taskId);

  if (error) {
    console.error("Error updating task:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete a task
 */
export async function deleteTask(
  taskId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Toggle task completion status
 */
export async function toggleTaskStatus(
  taskId: string,
  currentStatus: string
): Promise<{ success: boolean; error?: string }> {
  const newStatus = currentStatus === "completed" ? "pending" : "completed";
  const updates: Partial<Task> = {
    status: newStatus as Task["status"],
    completed_at: newStatus === "completed" ? new Date().toISOString() : undefined,
  };

  return updateTask(taskId, updates);
}

/**
 * Get all projects for a user
 */
export async function getProjects(userId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .eq("is_archived", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new project
 */
export async function createProject(
  userId: string,
  project: Omit<Project, "id" | "user_id" | "created_at" | "updated_at" | "is_archived">
): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      is_archived: false,
      ...project,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return null;
  }

  return data;
}

/**
 * Archive a project
 */
export async function archiveProject(
  projectId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("projects")
    .update({ is_archived: true, updated_at: new Date().toISOString() })
    .eq("id", projectId);

  if (error) {
    console.error("Error archiving project:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}