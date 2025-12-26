// FILE: app/tasks/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Check, X, Edit2, Filter } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "archived";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
  user_id: string;
};

const priorityColors: Record<string, string> = {
  low: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
  medium: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
  high: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300",
};

const statusColors: Record<string, string> = {
  pending: "border-slate-200 dark:border-slate-800",
  completed: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20",
  archived: "border-gray-300 dark:border-gray-700 opacity-60",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [sortBy, setSortBy] = useState<"due_date" | "priority" | "created">("due_date");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    due_date: "",
  });

  // Fetch user and tasks
  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          setLoading(false);
          return;
        }
        setUser(user);

        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching tasks:", error);
        } else {
          setTasks(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTasks();
  }, []);

  // Add or update task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.title.trim()) return;

    try {
      if (editingId) {
        // Update task
        const { error } = await supabase
          .from("tasks")
          .update({
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            due_date: formData.due_date || null,
          })
          .eq("id", editingId);

        if (error) throw error;

        setTasks(
          tasks.map(t =>
            t.id === editingId
              ? {
                  ...t,
                  title: formData.title,
                  description: formData.description,
                  priority: formData.priority,
                  due_date: formData.due_date || null,
                }
              : t
          )
        );
        setEditingId(null);
      } else {
        // Create new task
        const { data, error } = await supabase
          .from("tasks")
          .insert([
            {
              user_id: user.id,
              title: formData.title,
              description: formData.description,
              priority: formData.priority,
              due_date: formData.due_date || null,
              status: "pending",
            },
          ])
          .select()
          .single();

        if (error) throw error;
        setTasks([data, ...tasks]);
      }

      setFormData({ title: "", description: "", priority: "medium", due_date: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Toggle task completion
  const toggleTask = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      setTasks(tasks.map(t => (t.id === id ? { ...t, status: newStatus as Task["status"] } : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit task
  const startEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      due_date: task.due_date || "",
    });
    setEditingId(task.id);
    setShowForm(true);
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(t => {
    if (filter === "all") return t.status !== "archived";
    return t.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === "due_date") {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const completedCount = tasks.filter(t => t.status === "completed").length;
  const pendingCount = tasks.filter(t => t.status === "pending").length;

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Tasks</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {pendingCount} pending • {completedCount} completed
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Tasks</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{tasks.length}</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedCount}</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {tasks.length === 0 ? "0" : Math.round((completedCount / tasks.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={() => {
              setFormData({ title: "", description: "", priority: "medium", due_date: "" });
              setEditingId(null);
              setShowForm(!showForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? "Cancel" : "New Task"}
          </Button>

          <div className="flex gap-2">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="due_date">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="created">Sort by Created</option>
            </select>
          </div>
        </div>

        {/* Task Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter task description"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.due_date}
                    onChange={e => setFormData({ ...formData, due_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-end">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {editingId ? "Update Task" : "Create Task"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Tasks List */}
        <div className="space-y-3">
          {sortedTasks.length === 0 ? (
            <div className="p-8 text-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <p className="text-slate-600 dark:text-slate-400">No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            sortedTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border transition-all ${statusColors[task.status]} bg-white dark:bg-slate-900`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id, task.status)}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.status === "completed"
                        ? "bg-green-500 border-green-500"
                        : "border-slate-300 dark:border-slate-600 hover:border-green-500"
                    }`}
                  >
                    {task.status === "completed" && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            task.status === "completed"
                              ? "line-through text-slate-500 dark:text-slate-400"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(task)}
                          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      {task.due_date && (
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}