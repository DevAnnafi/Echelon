'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask, Task } from '../../lib/database';

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <TasksContent />
    </ProtectedRoute>
  );
}

function TasksContent() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    status: 'todo' as const,
    due_date: '',
  });

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getTasks(user.id);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.title.trim()) return;

    try {
      if (editingId) {
        const updated = await updateTask(editingId, {
          ...formData,
          user_id: user.id,
        });
        setTasks(tasks.map(t => t.id === editingId ? updated : t));
        setEditingId(null);
      } else {
        const newTask = await createTask({
          ...formData,
          user_id: user.id,
        });
        setTasks([newTask, ...tasks]);
      }
      setFormData({ title: '', description: '', priority: 'medium', status: 'todo', due_date: '' });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to save task');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      due_date: task.due_date?.split('T')[0] || '',
    });
    setEditingId(task.id);
    setShowForm(true);
  };

  const handleStatusChange = async (task: Task) => {
    const statuses: Array<'todo' | 'in_progress' | 'completed'> = ['todo', 'in_progress', 'completed'];
    const currentIndex = statuses.indexOf(task.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    try {
      const updated = await updateTask(task.id, { status: nextStatus });
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in_progress':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tasks</h1>
          <p className="text-gray-400">Manage and track your daily tasks</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Total</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">To Do</p>
            <p className="text-2xl font-bold text-blue-400">{stats.todo}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.inProgress}</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Add Task Button */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: '', description: '', priority: 'medium', status: 'todo', due_date: '' });
          }}
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          {showForm ? 'Cancel' : 'Add Task'}
        </button>

        {/* Task Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Task title..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Task description..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {editingId ? 'Update Task' : 'Create Task'}
            </button>
          </form>
        )}

        {/* Tasks List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 border border-slate-700 rounded-lg">
            <p className="text-gray-400">No tasks yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors flex items-start justify-between group"
              >
                <div className="flex-1 flex items-start gap-4">
                  <button
                    onClick={() => handleStatusChange(task)}
                    className={`mt-1 flex-shrink-0 transition-colors ${getStatusColor(task.status)}`}
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>

                  <div className="flex-1">
                    <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      {task.due_date && (
                        <span className="text-xs text-gray-400">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(task)}
                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
