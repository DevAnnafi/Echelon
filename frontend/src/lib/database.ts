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

// TODO: Rewrite all functions below to use Prisma API routes

const API_BASE = '/api';

// Task operations
export async function getTasks(userId: string): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(task) });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}

// Document operations
export async function getDocuments(userId: string): Promise<Document[]> {
  const res = await fetch(`${API_BASE}/documents?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
}

export async function createDocument(doc: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document> {
  const res = await fetch(`${API_BASE}/documents`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(doc) });
  if (!res.ok) throw new Error('Failed to create document');
  return res.json();
}

export async function updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
  const res = await fetch(`${API_BASE}/documents/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
  if (!res.ok) throw new Error('Failed to update document');
  return res.json();
}

export async function deleteDocument(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete document');
}

// Goal operations
export async function getGoals(userId: string): Promise<Goal[]> {
  const res = await fetch(`${API_BASE}/goals?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch goals');
  return res.json();
}

export async function createGoal(goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>): Promise<Goal> {
  const res = await fetch(`${API_BASE}/goals`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(goal) });
  if (!res.ok) throw new Error('Failed to create goal');
  return res.json();
}

export async function updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
  const res = await fetch(`${API_BASE}/goals/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
  if (!res.ok) throw new Error('Failed to update goal');
  return res.json();
}

export async function deleteGoal(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/goals/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete goal');
}

// Goal milestone operations
export async function getGoalMilestones(goalId: string): Promise<GoalMilestone[]> {
  const res = await fetch(`${API_BASE}/goals/${goalId}/milestones`);
  if (!res.ok) throw new Error('Failed to fetch milestones');
  return res.json();
}

export async function createGoalMilestone(milestone: Omit<GoalMilestone, 'id' | 'created_at' | 'updated_at'>): Promise<GoalMilestone> {
  const res = await fetch(`${API_BASE}/goals/${milestone.goal_id}/milestones`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(milestone) });
  if (!res.ok) throw new Error('Failed to create milestone');
  return res.json();
}

export async function updateGoalMilestone(id: string, updates: Partial<GoalMilestone>): Promise<GoalMilestone> {
  const res = await fetch(`${API_BASE}/milestones/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
  if (!res.ok) throw new Error('Failed to update milestone');
  return res.json();
}

export async function deleteGoalMilestone(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/milestones/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete milestone');
}

// Productivity metrics operations
export async function getProductivityMetrics(userId: string, days: number = 30): Promise<ProductivityMetric[]> {
  const res = await fetch(`${API_BASE}/metrics?userId=${userId}&days=${days}`);
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
}

export async function updateProductivityMetrics(userId: string, date: string, updates: Partial<ProductivityMetric>): Promise<ProductivityMetric> {
  const res = await fetch(`${API_BASE}/metrics`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, date, ...updates }) });
  if (!res.ok) throw new Error('Failed to update metrics');
  return res.json();
}

// AI Insights operations
export async function getAIInsights(userId: string): Promise<AIInsight[]> {
  const res = await fetch(`${API_BASE}/insights?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch insights');
  return res.json();
}

export async function createAIInsight(insight: Omit<AIInsight, 'id' | 'created_at'>): Promise<AIInsight> {
  const res = await fetch(`${API_BASE}/insights`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(insight) });
  if (!res.ok) throw new Error('Failed to create insight');
  return res.json();
}

// Activity log
export async function logActivity(userId: string, action: string, entityType: string, entityId?: string, details?: any): Promise<void> {
  await fetch(`${API_BASE}/activity`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, action, entity_type: entityType, entity_id: entityId, details }) });
}