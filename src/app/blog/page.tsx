"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Echelon: Your Productivity Journey Begins",
    excerpt: "Learn how to set up your Echelon dashboard and start tracking your tasks, habits, and goals effectively.",
    date: "2026-01-20",
    readTime: "5 min read",
    category: "Getting Started",
  },
  {
    id: 2,
    title: "Mastering the AI Assistant: Tips and Tricks",
    excerpt: "Discover how to get the most out of Echelon's AI-powered assistant for planning and productivity insights.",
    date: "2026-01-15",
    readTime: "7 min read",
    category: "Features",
  },
  {
    id: 3,
    title: "Building Better Habits with Data-Driven Insights",
    excerpt: "How to use Echelon's analytics to understand your patterns and build lasting productive habits.",
    date: "2026-01-10",
    readTime: "6 min read",
    category: "Productivity",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Blog</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Tips, updates, and insights to help you maximize your productivity with Echelon.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {post.excerpt}
              </p>
              
              <button 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                disabled
              >
                Read More <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-900 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            More Content Coming Soon
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            We're working on more articles to help you get the most out of Echelon. 
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
}
