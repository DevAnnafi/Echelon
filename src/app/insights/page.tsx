'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Brain, TrendingUp, Zap, Clock } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { getTasks, getGoals, getProductivityMetrics, getAIInsights, AIInsight } from '@/lib/database';

export default function InsightsPage() {
  return (
    <ProtectedRoute>
      <InsightsContent />
    </ProtectedRoute>
  );
}

function InsightsContent() {
  const { user } = useAuth();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    activeGoals: 0,
    avgProductivity: 0,
  });

  useEffect(() => {
    if (user) {
      loadInsights();
    }
  }, [user]);

  const loadInsights = async () => {
    if (!user) return;
    try {
      setLoading(true);

      // Load all data
      const [tasksData, goalsData, metricsData, insightsData] = await Promise.all([
        getTasks(user.id),
        getGoals(user.id),
        getProductivityMetrics(user.id, 30),
        getAIInsights(user.id),
      ]);

      // Calculate stats
      const completedTasks = tasksData.filter(t => t.status === 'completed').length;
      const activeGoals = goalsData.filter(g => g.status === 'active').length;
      const avgProductivity = metricsData.length > 0
        ? Math.round(metricsData.reduce((sum, m) => sum + m.productivity_score, 0) / metricsData.length)
        : 0;

      setStats({
        totalTasks: tasksData.length,
        completedTasks,
        activeGoals,
        avgProductivity,
      });

      setInsights(insightsData);
      setError(null);
    } catch (err) {
      setError('Failed to load insights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'productivity_pattern':
        return <TrendingUp size={20} />;
      case 'task_recommendation':
        return <Zap size={20} />;
      case 'time_management':
        return <Clock size={20} />;
      case 'workflow_optimization':
        return <Brain size={20} />;
      default:
        return <Brain size={20} />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'productivity_pattern':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'task_recommendation':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'time_management':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'workflow_optimization':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Brain size={32} />
            AI Insights
          </h1>
          <p className="text-gray-400">Get personalized productivity recommendations</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Total Tasks</p>
            <p className="text-3xl font-bold text-white">{stats.totalTasks}</p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-400">{stats.completedTasks}</p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Active Goals</p>
            <p className="text-3xl font-bold text-blue-400">{stats.activeGoals}</p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Avg Productivity</p>
            <p className="text-3xl font-bold text-purple-400">{stats.avgProductivity}%</p>
          </div>
        </div>

        {/* Insights */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading insights...</p>
          </div>
        ) : insights.length === 0 ? (
          <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
            <Brain size={48} className="mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">No insights yet. Keep using the app to get personalized recommendations!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-6 border rounded-lg ${getInsightColor(insight.insight_type)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getInsightIcon(insight.insight_type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 capitalize">
                      {insight.insight_type.replace(/_/g, ' ')}
                    </h3>
                    <p className="text-sm leading-relaxed">{insight.content}</p>
                    <p className="text-xs opacity-75 mt-3">
                      Generated: {new Date(insight.generated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap size={24} />
            Quick Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <h3 className="font-semibold text-white mb-2">📊 Productivity Boost</h3>
              <p className="text-sm text-gray-400">
                Focus on completing high-priority tasks first. You're {stats.completedTasks > stats.totalTasks / 2 ? 'doing great' : 'on track'} with your task completion!
              </p>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <h3 className="font-semibold text-white mb-2">🎯 Goal Progress</h3>
              <p className="text-sm text-gray-400">
                You have {stats.activeGoals} active goal{stats.activeGoals !== 1 ? 's' : ''}. Keep tracking milestones to stay motivated!
              </p>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <h3 className="font-semibold text-white mb-2">⏰ Time Management</h3>
              <p className="text-sm text-gray-400">
                Break down larger tasks into smaller, manageable subtasks to improve focus and reduce overwhelm.
              </p>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <h3 className="font-semibold text-white mb-2">💡 Workflow Tips</h3>
              <p className="text-sm text-gray-400">
                Review your completed tasks weekly to identify patterns and optimize your workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
