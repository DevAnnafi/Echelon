/**
 * Project and Task types for Echelon
 */

export type TaskStatus = "pending" | "in_progress" | "completed" | "archived";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at?: string;
  tags?: string[];
  project_id?: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  is_archived: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  target_count: number;
  current_streak: number;
  longest_streak: number;
  created_at: string;
  updated_at?: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  completed_at: string;
  notes?: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  project_id?: string;
  search?: string;
  due_before?: string;
  due_after?: string;
}

export interface TaskSortOptions {
  field: "created_at" | "due_date" | "priority" | "title";
  direction: "asc" | "desc";
}