"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Documentation
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              1. Overview
            </h2>
            <p>
              Echelon is a modern productivity and analytics platform designed to
              help individuals plan tasks, track performance, and leverage
              AI-powered insights to improve daily efficiency and decision
              making.
            </p>
          </section>

          {/* Core Features */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              2. Core Features
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Task creation, prioritization, and progress tracking</li>
              <li>Analytics dashboard for productivity insights</li>
              <li>AI assistant for planning and optimization</li>
              <li>Secure authentication and session management</li>
            </ul>
          </section>

          {/* Task Management */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              3. Task Management
            </h2>
            <p>
              Users can create and manage tasks with clear priorities and
              statuses. Tasks are designed to provide visibility into workload
              and help users stay organized throughout the day.
            </p>
          </section>

          {/* Analytics */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              4. Analytics & Insights
            </h2>
            <p>
              Echelon provides analytics to help users understand productivity
              patterns, task completion trends, and areas for improvement. These
              insights are intended to support better planning and reflection.
            </p>
          </section>

          {/* AI Assistant */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              5. AI Assistant
            </h2>
            <p className="mb-4">
              The AI assistant offers suggestions related to task planning,
              prioritization, and workflow optimization. Please note:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>AI suggestions are advisory and may not always be accurate</li>
              <li>Users should validate recommendations independently</li>
              <li>The AI may have limitations or incomplete context</li>
            </ul>
          </section>

          {/* Technology Stack */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              6. Technology Stack
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js (App Router)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Supabase (Authentication & Database)</li>
              <li>OpenAI API (AI Assistant)</li>
            </ul>
          </section>

          {/* Environment Variables */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              7. Environment Variables
            </h2>
            <p className="mb-4">
              The following environment variables are required for local
              development:
            </p>
            <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg text-sm overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key`}
            </pre>
          </section>

          {/* Roadmap */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              8. Roadmap
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Team collaboration features</li>
              <li>Role-based access control</li>
              <li>Advanced analytics and AI insights</li>
              <li>Mobile-first enhancements</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              9. Usage Disclaimer
            </h2>
            <p className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
              Echelon is provided for productivity and informational purposes
              only. Features, analytics, and AI-generated insights should not be
              relied upon as professional advice.
            </p>
          </section>

          {/* Support */}
          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Questions or Support?
            </h2>
            <p>
              If you have questions about this documentation or the Echelon
              platform, please contact:{' '}
              <a
                href="mailto:islamannafi@gmail.com"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                islamannafi@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
