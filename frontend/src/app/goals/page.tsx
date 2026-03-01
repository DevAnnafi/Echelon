'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, AlertCircle, CheckCircle2, Target } from 'lucide-react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { getGoals, createGoal, updateGoal, deleteGoal, Goal, getGoalMilestones, createGoalMilestone, updateGoalMilestone, deleteGoalMilestone, GoalMilestone } from '../../lib/database';

export default function GoalsPage() {
  return (
    <ProtectedRoute>
      <GoalsContent />
    </ProtectedRoute>
  );
}

function GoalsContent() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [milestones, setMilestones] = useState<GoalMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_date: '',
    progress: 0,
    status: 'active' as const,
  });

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

  useEffect(() => {
    if (selectedGoal) {
      loadMilestones(selectedGoal.id);
    }
  }, [selectedGoal]);

  const loadGoals = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getGoals(user.id);
      setGoals(data);
      setError(null);
    } catch (err) {
      setError('Failed to load goals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMilestones = async (goalId: string) => {
    try {
      const data = await getGoalMilestones(goalId);
      setMilestones(data);
    } catch (err) {
      console.error('Failed to load milestones:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.title.trim()) return;

    try {
      if (editingId) {
        const updated = await updateGoal(editingId, {
          ...formData,
          user_id: user.id,
        });
        setGoals(goals.map(g => g.id === editingId ? updated : g));
        if (selectedGoal?.id === editingId) setSelectedGoal(updated);
        setEditingId(null);
      } else {
        const newGoal = await createGoal({
          ...formData,
          user_id: user.id,
        });
        setGoals([newGoal, ...goals]);
      }
      setFormData({ title: '', description: '', target_date: '', progress: 0, status: 'active' });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to save goal');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteGoal(id);
      setGoals(goals.filter(g => g.id !== id));
      if (selectedGoal?.id === id) setSelectedGoal(null);
    } catch (err) {
      setError('Failed to delete goal');
      console.error(err);
    }
  };

  const handleEdit = (goal: Goal) => {
    setFormData({
      title: goal.title,
      description: goal.description || '',
      target_date: goal.target_date?.split('T')[0] || '',
      progress: goal.progress,
      status: goal.status,
    });
    setEditingId(goal.id);
    setShowForm(true);
    setSelectedGoal(null);
  };

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoal || !newMilestoneTitle.trim()) return;

    try {
      const milestone = await createGoalMilestone({
        goal_id: selectedGoal.id,
        title: newMilestoneTitle,
        completed: false,
      });
      setMilestones([...milestones, milestone]);
      setNewMilestoneTitle('');
    } catch (err) {
      setError('Failed to add milestone');
      console.error(err);
    }
  };

  const handleToggleMilestone = async (milestone: GoalMilestone) => {
    try {
      const updated = await updateGoalMilestone(milestone.id, {
        completed: !milestone.completed,
      });
      setMilestones(milestones.map(m => m.id === milestone.id ? updated : m));
    } catch (err) {
      setError('Failed to update milestone');
      console.error(err);
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    try {
      await deleteGoalMilestone(id);
      setMilestones(milestones.filter(m => m.id !== id));
    } catch (err) {
      setError('Failed to delete milestone');
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'archived':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Goals</h1>
          <p className="text-gray-400">Set and track your goals with milestones</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goals List */}
          <div className="lg:col-span-1">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({ title: '', description: '', target_date: '', progress: 0, status: 'active' });
                setSelectedGoal(null);
              }}
              className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={20} />
              New Goal
            </button>

            {loading ? (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Loading...</p>
              </div>
            ) : goals.length === 0 ? (
              <div className="text-center py-8 bg-slate-800/30 border border-slate-700 rounded-lg">
                <p className="text-gray-400 text-sm">No goals yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      setSelectedGoal(goal);
                      setShowForm(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedGoal?.id === goal.id
                        ? 'bg-blue-600/30 border border-blue-500'
                        : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <h3 className="font-semibold text-white truncate">{goal.title}</h3>
                    <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{goal.progress}% complete</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Goal Details */}
          <div className="lg:col-span-2">
            {showForm ? (
              <form onSubmit={handleSubmit} className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg h-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Goal title..."
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Goal description..."
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Date</label>
                    <input
                      type="date"
                      value={formData.target_date}
                      onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Progress: {formData.progress}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingId ? 'Update Goal' : 'Create Goal'}
                </button>
              </form>
            ) : selectedGoal ? (
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Target size={24} />
                      {selectedGoal.title}
                    </h2>
                    <span className={`inline-block text-xs px-2 py-1 rounded border mt-2 ${getStatusColor(selectedGoal.status)}`}>
                      {selectedGoal.status.charAt(0).toUpperCase() + selectedGoal.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(selectedGoal)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedGoal.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {selectedGoal.description && (
                  <p className="text-gray-300 mb-4">{selectedGoal.description}</p>
                )}

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-semibold text-white">{selectedGoal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                      style={{ width: `${selectedGoal.progress}%` }}
                    />
                  </div>
                </div>

                {selectedGoal.target_date && (
                  <p className="text-sm text-gray-400 mb-6">
                    Target: {new Date(selectedGoal.target_date).toLocaleDateString()}
                  </p>
                )}

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-4">Milestones</h3>
                  <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-3 p-3 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
                      >
                        <button
                          onClick={() => handleToggleMilestone(milestone)}
                          className={`flex-shrink-0 transition-colors ${
                            milestone.completed ? 'text-green-400' : 'text-gray-400'
                          }`}
                        >
                          <CheckCircle2 size={20} />
                        </button>
                        <span className={`flex-1 ${milestone.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                          {milestone.title}
                        </span>
                        <button
                          onClick={() => handleDeleteMilestone(milestone.id)}
                          className="p-1 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddMilestone} className="flex gap-2">
                    <input
                      type="text"
                      value={newMilestoneTitle}
                      onChange={(e) => setNewMilestoneTitle(e.target.value)}
                      placeholder="Add a milestone..."
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg h-full flex items-center justify-center">
                <p className="text-gray-400">Select a goal or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
