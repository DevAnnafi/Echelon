"use client";

import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-black to-slate-900/10 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your application performance and metrics</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8 flex gap-3">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <div className="flex items-center justify-center min-h-96">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-slate-600/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-16 border border-white/10 text-center max-w-md">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-600/20 rounded-lg">
                  <BarChart3 className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3">No Data Yet</h2>
              <p className="text-gray-400 mb-6">
                Analytics will appear here once you log in.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <TrendingUp size={16} />
                <span>Waiting for user activity...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}