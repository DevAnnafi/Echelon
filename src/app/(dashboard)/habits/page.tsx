import { Target, Plus } from 'lucide-react'

export default function HabitsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Habits</h1>
          <p className="text-muted-foreground">Build and track your daily habits</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Habit
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No habits yet</h2>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">
          Start building positive habits. Track daily check-ins and maintain streaks to stay consistent.
        </p>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm">
          <Plus className="w-4 h-4" />
          Create First Habit
        </button>
      </div>
    </div>
  )
}
