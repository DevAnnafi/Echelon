'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement password reset with Auth.js
    setTimeout(() => { setSent(true); setLoading(false); }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md p-8 bg-slate-800/50 border border-slate-700 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Reset password</h1>
        <p className="text-gray-400 mb-8">We&apos;ll send you a reset link</p>
        {sent ? (
          <div className="text-center">
            <p className="text-green-400 mb-4">Check your email for a reset link.</p>
            <Link href="/login" className="text-blue-400 hover:underline">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors">{loading ? 'Sending...' : 'Send Reset Link'}</button>
            <Link href="/login" className="block text-center text-sm text-blue-400 hover:underline">Back to login</Link>
          </form>
        )}
      </div>
    </div>
  );
}
