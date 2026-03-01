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
            Manage tasks, track habits, and get AI-powered insights—all in one beautiful, personalized dashboard.
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
            No credit card required · Free plan available forever
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
              description: 'Organize your work with powerful task tracking, priorities, and due dates.',
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: 'Habit Tracking',
              description: 'Build lasting habits with daily check-ins and streak tracking.',
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Fitness Monitoring',
              description: 'Log workouts, track calories, and monitor your fitness progress.',
            },
            {
              icon: <Brain className="w-8 h-8" />,
              title: 'AI Assistant',
              description: 'Get intelligent insights and personalized productivity recommendations.',
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Analytics Dashboard',
              description: 'Visualize your progress with beautiful charts and statistics.',
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'Personalized Dashboard',
              description: 'Your own private workspace, customized to your goals and workflow.',
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
                'Community support',
              ],
              cta: 'Get Started',
              href: '/signin',
              popular: false,
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
                'Export data',
              ],
              cta: 'Start Free Trial',
              href: '/signin',
              popular: true,
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
                'Early access to features',
              ],
              cta: 'Buy Lifetime',
              href: '/signin',
              popular: false,
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
