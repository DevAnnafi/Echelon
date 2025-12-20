"use client";

import { Button } from "../components/ui/button";
import { ArrowRight, Zap, Brain, BarChart3, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Task = { id: string; title: string; status: string };
type Note = { id: string; title: string; content: string };
type AIConversation = { id: string; prompt: string; response: string };

export default function Home() {
  // --- Supabase state ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [aiConversations, setAIConversations] = useState<AIConversation[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Features section ---
  const features = [
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Chat with an OpenAI-powered coach to plan your day and generate ideas.",
    },
    {
      icon: CheckCircle,
      title: "Task & Habit Tracker",
      description: "Add, complete, and visualize tasks with streaks and progress indicators.",
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Interactive charts to track habits, workouts, and goals in real-time.",
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Seamless synchronization across all your devices with cloud persistence.",
    },
  ];

  // --- Fetch data from Supabase ---
  useEffect(() => {
    const fetchData = async () => {
      const user = supabase.auth.users();
      if (!user) {
        setLoading(false);
        return;
      }

      const [tasksRes, notesRes, aiRes] = await Promise.all([
        supabase.from("tasks").select("*").eq("user_id", user.id),
        supabase.from("notes").select("*").eq("user_id", user.id),
        supabase.from("ai_conversations").select("*").eq("user_id", user.id),
      ]);

      if (tasksRes.error) console.error("Tasks Error:", tasksRes.error);
      if (notesRes.error) console.error("Notes Error:", notesRes.error);
      if (aiRes.error) console.error("AI Error:", aiRes.error);

      setTasks(tasksRes.data || []);
      setNotes(notesRes.data || []);
      setAIConversations(aiRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* --- Header with Sign In Button --- */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-slate-950 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Echelon</h1>
          <Link href="/login">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="text-center space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                  ✨ AI-Powered Productivity Dashboard
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                Elevate Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Productivity
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                An intelligent dashboard that combines AI insights, task tracking, and data visualization to help you manage your life smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link href="/dashboard">
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
              <div className="mt-16 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-2 shadow-2xl">
                <div className="bg-white dark:bg-slate-950 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center text-slate-400 dark:text-slate-600">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Dynamic Data Preview Section --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Your Dashboard Preview</h2>

            {loading ? (
              <p>Loading data...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tasks Preview */}
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Tasks</h3>
                  {tasks.length === 0 ? <p className="text-slate-600 dark:text-slate-400">No tasks yet.</p> : (
                    <ul className="space-y-1">
                      {tasks.slice(0, 5).map(task => (
                        <li key={task.id}>{task.title} - {task.status}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Notes Preview */}
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Notes</h3>
                  {notes.length === 0 ? <p className="text-slate-600 dark:text-slate-400">No notes yet.</p> : (
                    <ul className="space-y-1">
                      {notes.slice(0, 5).map(note => (
                        <li key={note.id}>{note.title}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* AI Conversations Preview */}
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">AI Conversations</h3>
                  {aiConversations.length === 0 ? <p className="text-slate-600 dark:text-slate-400">No conversations yet.</p> : (
                    <ul className="space-y-1">
                      {aiConversations.slice(0, 5).map(conv => (
                        <li key={conv.id}>{conv.prompt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* --- Features Section --- */}
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

        {/* --- Tech Stack Section --- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Built with Modern Tech
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Leveraging the latest technologies for performance and scalability
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["Next.js","React","TypeScript","TailwindCSS","Recharts","OpenAI"].map(tech => (
                <div
                  key={tech}
                  className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center font-semibold text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to elevate your productivity?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start managing your tasks, habits, and goals with AI-powered insights today.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 font-semibold"
              >
                Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}