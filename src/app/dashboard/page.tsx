'use client';

import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, TrendingUp, Zap, Calendar, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const chartData = [
    { day: 'Mon', productivity: 65, focus: 70 },
    { day: 'Tue', productivity: 72, focus: 75 },
    { day: 'Wed', productivity: 58, focus: 62 },
    { day: 'Thu', productivity: 81, focus: 85 },
    { day: 'Fri', productivity: 76, focus: 78 },
    { day: 'Sat', productivity: 88, focus: 90 },
    { day: 'Sun', productivity: 95, focus: 92 },
  ];

  const tasks = [
    { id: 1, title: 'Design landing page', category: 'Work', priority: 'high', completed: true },
    { id: 2, title: 'Review pull requests', category: 'Work', priority: 'high', completed: true },
    { id: 3, title: 'Update documentation', category: 'Work', priority: 'medium', completed: false },
    { id: 4, title: 'Morning workout', category: 'Health', priority: 'medium', completed: true },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
            Your <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Intelligent Workspace</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Everything you need to manage your life in one beautiful dashboard
          </p>
        </div>

        {/* Dashboard Preview Container */}
        <div className="relative mb-16">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>

          {/* Main dashboard */}
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header bar */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Echelon Dashboard Preview</h3>
              </div>
              <div className="flex gap-3">
                <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-8 grid md:grid-cols-3 gap-8">
              {/* Left column - Tasks & AI */}
              <div className="md:col-span-2 space-y-8">
                {/* AI Assistant */}
                <div
                  className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onMouseEnter={() => setHoveredCard('ai')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-2">AI Assistant</h4>
                      <p className="text-slate-400 text-sm mb-4">
                        "Based on your recent activity, I recommend prioritizing your project proposal today. You've had a 7-day productivity streak!"
                      </p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 text-xs rounded transition-colors">
                          Accept
                        </button>
                        <button className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div
                  className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
                  onMouseEnter={() => setHoveredCard('tasks')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-400" />
                    <h4 className="font-bold text-white">Today's Tasks</h4>
                    <span className="ml-auto text-sm text-slate-400">4/4 completed</span>
                  </div>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/60 transition-colors">
                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 ${
                          task.completed 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500' 
                            : 'border-slate-500'
                        }`}>
                          {task.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                            {task.title}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-slate-600/50 text-slate-300'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Stats & Chart */}
              <div className="space-y-8">
                {/* Stats */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/60 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-xs font-medium">Current Streak</p>
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">7 days</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-slate-800/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/60 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-xs font-medium">Tasks Completed</p>
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">24/28</p>
                    <p className="text-xs text-slate-400 mt-1">86% completion rate</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-slate-800/50 border border-green-500/30 rounded-xl p-4 hover:border-green-500/60 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-xs font-medium">Productivity Score</p>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">92%</p>
                    <p className="text-xs text-green-400 mt-1">↑ +8% this week</p>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-medium mb-3">Weekly Trend</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '11px' }} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="productivity" stroke="#a78bfa" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <p className="text-slate-400 mb-6">Ready to transform your productivity?</p>
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
            Start Your Free Dashboard →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}