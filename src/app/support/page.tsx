"use client";

import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Book, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Support Center</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Need help? We're here to assist you with any questions or issues.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Contact Support */}
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Support</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a href="mailto:islamannafi@gmail.com">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </a>
          </div>

          {/* Documentation */}
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Documentation</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Browse our documentation for guides and tutorials.
            </p>
            <Link href="/documentation">
              <Button variant="outline">
                <Book className="w-4 h-4 mr-2" />
                View Docs
              </Button>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">FAQ</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Find answers to commonly asked questions.
            </p>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </div>

          {/* GitHub */}
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
              <ExternalLink className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">GitHub</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Report bugs or request features on our GitHub repository.
            </p>
            <a href="https://github.com/DevAnnafi/echelon" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Common Issues */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Common Issues</h2>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Can't log in to my account</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Try resetting your password using the "Forgot password" link on the login page. 
                If issues persist, clear your browser cache and cookies, then try again.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">AI Assistant not responding</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                The AI assistant requires an active internet connection. If issues persist, 
                try refreshing the page or checking back later as the service may be temporarily unavailable.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Tasks not syncing</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Ensure you're logged in and have a stable internet connection. 
                Try refreshing the page to trigger a sync. Data is automatically saved when you make changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
