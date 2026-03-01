/**
 * User types for Echelon
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name?: string;
  bio?: string;
  timezone?: string;
  preferences?: UserPreferences;
  created_at: string;
  updated_at?: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  notifications_enabled: boolean;
  email_notifications: boolean;
  weekly_report: boolean;
}

export interface UserStats {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  current_streak: number;
  longest_streak: number;
  productivity_score: number;
}