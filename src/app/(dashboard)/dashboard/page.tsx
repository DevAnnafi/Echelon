'use client'

import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, ListTodo, Target, Flame, Plus, Zap, Brain, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Stats {
  completedToday: number
  activeTasks: number
  activeGoals: number
  currentStreak: number
}

export default function DashboardPage() {
  const supabase = createClient()
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string } } | null>(null)
  const [stats, setStats] = useState<Stats>({
    completedToday: 0,
    activeTasks: 0,
    activeGoals: 0,
    currentStreak: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        loadStats(currentUser.id)
      } else {
        setLoading(false)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadStats = async (userId: string) => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const [completedRes, activeRes, habitsRes] = await Promise.all([
        supabase
          .from('tasks')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('status', 'completed')
          .gte('completed_at', today.toISOString()),
        supabase
          .from('tasks')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .in('status', ['todo', 'in-progress']),
        supabase
          .from('habits')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId),
      ])

      setStats({
        completedToday: completedRes.count ?? 0,
        activeTasks: activeRes.count ?? 0,
        activeGoals: habitsRes.count ?? 0,
        currentStreak: 0,
      })
    } catch {
      // Tables may not exist yet — show zeroes
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'there'

  const statCards = [
    {
      label: 'Completed Today',
      value: stats.completedToday,
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      label: 'Active Tasks',
      value: stats.activeTasks,
      icon: <ListTodo className="w-6 h-6" />,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Active Habits',
      value: stats.activeGoals,
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      label: 'Day Streak',
      value: stats.currentStreak,
      icon: <Flame className="w-6 h-6" />,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
    },
  ]

  const quickActions = [
    { label: 'New Task', icon: <Plus className="w-5 h-5" />, href: '/tasks', color: 'bg-primary/10 text-primary hover:bg-primary/20' },
    { label: 'New Habit', icon: <Target className="w-5 h-5" />, href: '/habits', color: 'bg-accent/10 text-accent hover:bg-accent/20' },
    { label: 'Log Workout', icon: <Zap className="w-5 h-5" />, href: '/analytics', color: 'bg-orange-400/10 text-orange-400 hover:bg-orange-400/20' },
    { label: 'AI Assistant', icon: <Brain className="w-5 h-5" />, href: '/ai-assistant', color: 'bg-purple-400/10 text-purple-400 hover:bg-purple-400/20' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {getGreeting()}, {displayName}!
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                {stat.icon}
              </div>
              <span className="text-3xl font-bold">
                {loading ? (
                  <span className="inline-block w-6 h-6 bg-muted rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg font-medium transition-colors ${action.color}`}
            >
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Welcome / Empty State */}
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Welcome to Echelon!</h2>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            Your personal productivity hub is ready. Start by adding your first task or setting up a habit to track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tasks"
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Add First Task
            </Link>
            <Link
              href="/habits"
              className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors text-sm"
            >
              Create a Habit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
