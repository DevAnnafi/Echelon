# Echelon Next.js - Complete Implementation Guide

## Overview

This guide contains ALL the code you need to rebuild Echelon in Next.js. Follow the steps in order.

## ✅ Already Completed

1. ✅ Next.js project initialized with TypeScript and Tailwind
2. ✅ Dependencies installed (@supabase/ssr, stripe, lucide-react, etc.)
3. ✅ Environment variables configured (.env.local)
4. ✅ Tailwind theme with Echelon colors (globals.css)
5. ✅ Supabase client utilities (client.ts, server.ts, middleware.ts)
6. ✅ Root middleware for auth protection
7. ✅ Directory structure created

## 🔄 What You Need to Do

### Step 1: Set Up Supabase Database

1. Go to your Supabase project: https://supabase.com/dashboard/project/frecdfskhmrdigwvcpnx
2. Navigate to **SQL Editor**
3. Copy and paste the entire SQL schema from `MIGRATION_GUIDE.md` (Database Migration section)
4. Click **Run** to create all tables and RLS policies

### Step 2: Configure Google OAuth in Supabase

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials (or use Supabase's built-in)
4. Add redirect URLs:
   - `http://localhost:3000/api/auth/callback` (development)
   - `https://your-domain.vercel.app/api/auth/callback` (production)

### Step 3: Install Missing UI Dependencies

```bash
cd /home/ubuntu/echelon-nextjs
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-slot @radix-ui/react-label
pnpm add date-fns recharts
```

### Step 4: Copy All Component Files

I've prepared all the code files you need. Here's what to implement:

#### A. Authentication Pages

**File: `src/app/(auth)/signin/page.tsx`**
```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignInPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [router, supabase.auth])

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      },
    })

    if (error) {
      console.error('Error signing in:', error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-echelon-animated">
      <div className="max-w-md w-full mx-4">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse-glow" />
              <h1 className="text-3xl font-bold text-foreground">Echelon</h1>
            </div>
            <p className="text-muted-foreground">AI-Powered Productivity Platform</p>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg px-6 py-3 font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
```

**File: `src/app/api/auth/callback/route.ts`**
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/dashboard`)
}
```

#### B. Landing Page

**File: `src/app/page.tsx`**
```typescript
import { Sparkles, CheckCircle2, Zap, Target, Brain, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-echelon-animated">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
            <span className="text-xl font-bold">Echelon</span>
          </div>
          <Link
            href="/signin"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6 animate-pulse-glow">
            ✨ AI-Powered Productivity Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Echelon: Your Elite Productivity Platform
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Manage tasks, track habits, monitor fitness, and get AI-powered insights—all in one beautiful, customizable dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signin"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Free plan available forever
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Everything You Need to Stay Productive
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <CheckCircle2 className="w-8 h-8" />,
              title: 'Task Management',
              description: 'Organize your work with powerful task tracking, priorities, and due dates.'
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: 'Habit Tracking',
              description: 'Build lasting habits with daily check-ins and streak tracking.'
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Fitness Monitoring',
              description: 'Log workouts, track calories, and monitor your fitness progress.'
            },
            {
              icon: <Brain className="w-8 h-8" />,
              title: 'AI Assistant',
              description: 'Get intelligent insights and personalized productivity recommendations.'
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Analytics Dashboard',
              description: 'Visualize your progress with beautiful charts and statistics.'
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'Quick Notes',
              description: 'Capture ideas instantly with our fast, searchable notes system.'
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: 'Free',
              price: '$0',
              period: 'forever',
              features: [
                'Up to 10 tasks',
                'Basic habit tracking',
                'Fitness logging',
                'Limited AI queries',
                'Community support'
              ],
              cta: 'Get Started',
              href: '/signin'
            },
            {
              name: 'Pro',
              price: '$9.99',
              period: 'per month',
              features: [
                'Unlimited tasks',
                'Advanced habit analytics',
                'Detailed fitness insights',
                'Unlimited AI assistant',
                'Priority support',
                'Export data'
              ],
              cta: 'Start Free Trial',
              href: '/signin',
              popular: true
            },
            {
              name: 'Lifetime',
              price: '$99',
              period: 'one-time',
              features: [
                'Everything in Pro',
                'Lifetime access',
                'All future updates',
                'Premium templates',
                'VIP support',
                'Early access to features'
              ],
              cta: 'Buy Lifetime',
              href: '/signin'
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`bg-card/80 backdrop-blur-sm border rounded-xl p-8 ${
                plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="text-primary text-sm font-semibold mb-4">MOST POPULAR</div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Echelon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
```

### Step 5: Create Dashboard Layout

**File: `src/app/(dashboard)/layout.tsx`**
```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { Sparkles, LayoutDashboard, CheckSquare, Target, Brain, BarChart3, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.Node
}) {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: '/tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { href: '/habits', label: 'Habits', icon: <Target className="w-5 h-5" /> },
    { href: '/ai-assistant', label: 'AI Assistant', icon: <Brain className="w-5 h-5" /> },
    { href: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
            <div>
              <h1 className="text-xl font-bold">Echelon</h1>
              <p className="text-xs text-muted-foreground">AI Productivity</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <p className="font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
```

### Step 6: Create Dashboard Page

**File: `src/app/(dashboard)/dashboard/page.tsx`**
```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, ListTodo, Target, Flame } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    completedToday: 0,
    activeTasks: 0,
    activeGoals: 0,
    totalStreak: 0,
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadStats(session.user.id)
      }
    })
  }, [supabase.auth])

  const loadStats = async (userId: string) => {
    // Load tasks completed today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { data: completedTasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('completed_at', today.toISOString())

    // Load active tasks
    const { data: activeTasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['todo', 'in-progress'])

    // Load active habits
    const { data: activeHabits } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)

    setStats({
      completedToday: completedTasks?.length || 0,
      activeTasks: activeTasks?.length || 0,
      activeGoals: activeHabits?.length || 0,
      totalStreak: 0, // Calculate streak logic separately
    })
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {getGreeting()}, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'there'}!
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Completed Today', value: stats.completedToday, icon: <CheckCircle2 className="w-6 h-6" />, color: 'text-green-500' },
          { label: 'Active Tasks', value: stats.activeTasks, icon: <ListTodo className="w-6 h-6" />, color: 'text-blue-500' },
          { label: 'Active Goals', value: stats.activeGoals, icon: <Target className="w-6 h-6" />, color: 'text-purple-500' },
          { label: 'Total Streak', value: stats.totalStreak, icon: <Flame className="w-6 h-6" />, color: 'text-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={stat.color}>{stat.icon}</div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
            + New Task
          </button>
          <button className="p-4 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors">
            + New Habit
          </button>
          <button className="p-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
            Log Workout
          </button>
          <button className="p-4 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors">
            Quick Note
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Step 7: Create Placeholder Pages

**File: `src/app/(dashboard)/tasks/page.tsx`**
```typescript
export default function TasksPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <p className="text-muted-foreground">Task management interface coming soon...</p>
        <p className="text-sm text-muted-foreground mt-2">You'll be able to create, edit, and manage tasks here.</p>
      </div>
    </div>
  )
}
```

**File: `src/app/(dashboard)/habits/page.tsx`**
```typescript
export default function HabitsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Habits</h1>
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <p className="text-muted-foreground">Habit tracking interface coming soon...</p>
        <p className="text-sm text-muted-foreground mt-2">Track your daily habits and build streaks here.</p>
      </div>
    </div>
  )
}
```

**File: `src/app/(dashboard)/ai-assistant/page.tsx`**
```typescript
export default function AIAssistantPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <p className="text-muted-foreground">AI Assistant interface coming soon...</p>
        <p className="text-sm text-muted-foreground mt-2">Chat with your AI productivity assistant here.</p>
      </div>
    </div>
  )
}
```

**File: `src/app/(dashboard)/analytics/page.tsx`**
```typescript
export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
        <p className="text-sm text-muted-foreground mt-2">View your productivity insights and charts here.</p>
      </div>
    </div>
  )
}
```

### Step 8: Update Root Layout

**File: `src/app/layout.tsx`**
```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Echelon - AI-Powered Productivity Platform',
  description: 'Manage tasks, track habits, monitor fitness, and get AI-powered insights',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

### Step 9: Test Your Application

```bash
cd /home/ubuntu/echelon-nextjs
pnpm dev
```

Visit `http://localhost:3000` and test:
1. Landing page loads
2. Sign in with Google works
3. Redirects to dashboard after authentication
4. All navigation links work
5. Sign out works

### Step 10: Deploy to Vercel

1. **Push to GitHub:**
```bash
cd /home/ubuntu/echelon-nextjs
git init
git add .
git commit -m "Initial Echelon Next.js"
git branch -M main
git remote add origin https://github.com/DevAnnafi/Echelon.git
git push origin main --force
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
   - Click Deploy

3. **Update Supabase Redirect URLs:**
   - Add your Vercel URL to Supabase OAuth redirect URLs

## Next Steps

After the basic app is working, you can implement:

1. **Full CRUD for Tasks** - Add create, edit, delete functionality
2. **Habit Tracking Logic** - Implement check-ins and streak calculations
3. **Fitness Logging** - Add workout tracking interface
4. **AI Assistant** - Integrate OpenAI API for chat
5. **Stripe Integration** - Add payment processing
6. **Analytics Charts** - Use Recharts for visualizations

All the foundation is now in place. You can build out each feature incrementally!

## Need Help?

If you get stuck:
1. Check the Supabase logs for auth issues
2. Check browser console for client-side errors
3. Check Vercel logs for server-side errors
4. Refer back to the original Vite codebase for logic reference

Good luck! 🚀
