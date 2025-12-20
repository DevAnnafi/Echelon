"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
            <p>Echelon operates the Echelon website and application. This page informs you of our policies regarding collection, use, and disclosure of personal data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Information Collection</h2>
            <p className="mb-4">We collect several types of information:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Email address and account information</li>
              <li>First name and last name</li>
              <li>Usage data and analytics</li>
              <li>Task and productivity data</li>
              <li>AI conversation history</li>
              <li>Cookies and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Use of Information</h2>
            <p>We use the collected information to provide, maintain, and improve our services, including personalizing your experience and analyzing usage patterns.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Data Security</h2>
            <p>The security of your data is important to us. While we implement industry-standard security measures, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Third-Party Services</h2>
            <p>We may use third-party services like Supabase for data storage and OpenAI for AI features. These services have their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Changes to Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of changes by posting the updated policy on this page.</p>
          </section>

          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p>For privacy-related questions, contact us at <a href="mailto:islamannafi@gmail.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">islamannafi@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}