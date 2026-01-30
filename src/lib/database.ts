import { supabase } from './supabase';

// Types
export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  title: string;
  content?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_date?: string;
  progress: number;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface GoalMilestone {
  id: string;
  goal_id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductivityMetric {
  id: string;
  user_id: string;
  date: string;
  tasks_completed: number;
  focus_hours: number;
  productivity_score: number;
  created_at: string;
}

export interface AIInsight {
  id: string;
  user_id: string;
  insight_type: 'productivity_pattern' | 'task_recommendation' | 'time_management' | 'workflow_optimization';
  content: string;
  generated_at: string;
  created_at: string;
}

// Task operations
export async function getTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Document operations
export async function getDocuments(userId: string): Promise<Document[]> {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createDocument(doc: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document> {
  const { data, error } = await supabase
    .from('documents')
    .insert([doc])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
  const { data, error } = await supabase
    .from('documents')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteDocument(id: string): Promise<void> {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Goal operations
export async function getGoals(userId: string): Promise<Goal[]> {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createGoal(goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>): Promise<Goal> {
  const { data, error } = await supabase
    .from('goals')
    .insert([goal])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGoal(id: string): Promise<void> {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Goal milestone operations
export async function getGoalMilestones(goalId: string): Promise<GoalMilestone[]> {
  const { data, error } = await supabase
    .from('goal_milestones')
    .select('*')
    .eq('goal_id', goalId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createGoalMilestone(milestone: Omit<GoalMilestone, 'id' | 'created_at' | 'updated_at'>): Promise<GoalMilestone> {
  const { data, error } = await supabase
    .from('goal_milestones')
    .insert([milestone])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGoalMilestone(id: string, updates: Partial<GoalMilestone>): Promise<GoalMilestone> {
  const { data, error } = await supabase
    .from('goal_milestones')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGoalMilestone(id: string): Promise<void> {
  const { error } = await supabase
    .from('goal_milestones')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Productivity metrics operations
export async function getProductivityMetrics(userId: string, days: number = 30): Promise<ProductivityMetric[]> {
  const { data, error } = await supabase
    .from('productivity_metrics')
    .select('*')
    .eq('user_id', userId)
    .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function updateProductivityMetrics(userId: string, date: string, updates: Partial<ProductivityMetric>): Promise<ProductivityMetric> {
  const { data, error } = await supabase
    .from('productivity_metrics')
    .upsert({
      user_id: userId,
      date,
      ...updates,
    }, { onConflict: 'user_id,date' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// AI Insights operations
export async function getAIInsights(userId: string): Promise<AIInsight[]> {
  const { data, error } = await supabase
    .from('ai_insights')
    .select('*')
    .eq('user_id', userId)
    .order('generated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createAIInsight(insight: Omit<AIInsight, 'id' | 'created_at'>): Promise<AIInsight> {
  const { data, error } = await supabase
    .from('ai_insights')
    .insert([insight])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Activity log operations
export async function logActivity(userId: string, action: string, entityType: string, entityId?: string, details?: any): Promise<void> {
  const { error } = await supabase
    .from('activity_logs')
    .insert([{
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
    }]);

  if (error) throw error;
}
