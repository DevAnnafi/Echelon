// FILE: app/page.tsx (Landing Page - Complete)
"use client";

import { Button } from "../components/ui/button";
import { ArrowRight, Zap, Brain, BarChart3, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { week: 'Week 1', tasks: 12, completed: 8, habits: 5 },
  { week: 'Week 2', tasks: 15, completed: 12, habits: 6 },
  { week: 'Week 3', tasks: 10, completed: 9, habits: 7 },
  { week: 'Week 4', tasks: 18, completed: 15, habits: 8 },
  { week: 'Week 5', tasks: 14, completed: 12, habits: 7 },
  { week: 'Week 6', tasks: 20, completed: 18, habits: 9 },
];

const demoTasks = [
  { id: 1, title: "Complete project proposal", status: "✅ Done", progress: 100 },
  { id: 2, title: "Morning workout routine", status: "🔥 5 day streak", progress: 100 },
  { id: 3, title: "Review quarterly goals", status: "⏳ In Progress", progress: 60 },
  { id: 4, title: "Team standup meeting", status: "📅 Today at 2pm", progress: 0 },
];

const demoConversations = [
  { id: 1, prompt: "Help me plan my week", preview: "I'll help you prioritize your tasks based on deadlines and..." },
  { id: 2, prompt: "What should I focus on today?", preview: "Based on your goals, I recommend starting with..." },
  { id: 3, prompt: "Analyze my productivity trends", preview: "Your completion rate has improved 23% this month..." },
];

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Chat with an OpenAI-powered coach to plan your day and generate ideas.",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      icon: CheckCircle,
      title: "Task & Habit Tracker",
      description: "Add, complete, and visualize tasks with streaks and progress indicators.",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Interactive charts to track habits, workouts, and goals in real-time.",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Seamless synchronization across all your devices with cloud persistence.",
      gradient: "from-cyan-500 to-sky-500",
    },
  ];

  return (
    <div className="w-full bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/images/Echelon_Logo.png"
                alt="Echelon"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold text-slate-900 dark:text-white">Echelon</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#demo" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Demo
              </a>
              <a href="#features" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#cta" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Get Started
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                ✨ AI-Powered Productivity Dashboard
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Productivity
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              An intelligent dashboard that combines AI insights, task tracking, and data visualization to help you manage your life smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-16 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-2 shadow-2xl overflow-hidden">
              <div className="bg-white dark:bg-slate-950 rounded-lg p-8">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="week" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0' }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="tasks" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTasks)" />
                    <Area type="monotone" dataKey="completed" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCompleted)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              See Echelon in Action
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Get a sneak peek at your future productivity dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tasks Preview */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Smart Task Management</h3>
              </div>
              
              <div className="space-y-3">
                {demoTasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-900 dark:text-white font-medium">{task.title}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">{task.status}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-green-600 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Preview */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI-Powered Insights</h3>
              </div>
              
              <div className="space-y-3">
                {demoConversations.map((conv) => (
                  <div key={conv.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 dark:text-white font-medium mb-1">{conv.prompt}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{conv.preview}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to organize, track, and optimize your productivity in one elegant platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Stay</span>{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Organized</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Manage tasks, habits, and daily updates in one elegant workspace - never lose track of your goals
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                10,000+
              </div>
              <p className="text-slate-600 dark:text-slate-400">Tasks Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                95%
              </div>
              <p className="text-slate-600 dark:text-slate-400">User Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-slate-600 dark:text-slate-400">AI Assistant Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Start free and upgrade when you want to level up your life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300 p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Starter
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Perfect for getting started
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    Free
                  </span>
                </div>
              </div>

              <Link href="/register">
                <button className="w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
                  Get Started
                </button>
              </Link>

              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  What's Included
                </p>
                <ul className="space-y-3">
                  {[
                    "Up to 50 tasks",
                    "Basic task tracking",
                    "5 AI conversations/month",
                    "Dark mode",
                    "Basic analytics",
                    "Email support",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Professional Plan - Highlighted */}
            <div className="rounded-2xl border-2 border-blue-500 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 p-8 relative">
              <div className="absolute -top-4 left-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                  ⭐ Most Popular
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 mt-4">
                Professional
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                For serious productivity enthusiasts
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    $9.99
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  Billed monthly. Cancel anytime.
                </p>
              </div>

              <Link href="/register">
                <button className="w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>
              </Link>

              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  What's Included
                </p>
                <ul className="space-y-3">
                  {[
                    "Unlimited tasks",
                    "Advanced task & habit tracking",
                    "Unlimited AI conversations",
                    "3 AI assistant modes",
                    "Advanced analytics & charts",
                    "Project collaboration (3 projects)",
                    "Priority email support",
                    "Export data (CSV, PDF)",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300 p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Enterprise
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                For teams & power users
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    $29.99
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  Billed monthly. Cancel anytime.
                </p>
              </div>

              <Link href="/register">
                <button className="w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
                  Contact Sales
                </button>
              </Link>

              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  What's Included
                </p>
                <ul className="space-y-3">
                  {[
                    "Everything in Professional",
                    "Unlimited projects & team members",
                    "Real-time team collaboration",
                    "Custom AI assistant training",
                    "Advanced integrations (Slack, Calendar, Notion)",
                    "API access",
                    "Dedicated account manager",
                    "24/7 priority support",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to elevate your productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start managing your tasks, habits, and goals with AI-powered insights today.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 font-semibold"
            >
              Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/Echelon_Logo.png"
                  alt="Echelon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-lg font-bold text-slate-900 dark:text-white">Echelon</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                AI-powered personal productivity dashboard. Manage tasks, track habits, and gain insights.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/DevAnnafi" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/axnnafi" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/annafi-islam/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="/dashboard" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#demo" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#demo" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">AI Assistant</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                <li><a href="/documentation" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://github.com/DevAnnafi" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a></li>
                <li><a href="/support" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="/disclaimer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2026 Echelon Dashboard. Built by a software engineer who wants to help you improve your productivity.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Note */}
      <div className="bg-slate-900 dark:bg-black py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-slate-500 text-center">
          Last Updated: January 2026 | Version: 1.0.0
        </p>
      </div>
    </div>
  );
}