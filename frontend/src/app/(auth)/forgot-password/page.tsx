"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-slate-900/20 pointer-events-none"></div>
        <div className="fixed top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-slate-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center justify-center w-20 h-20 mb-4 mx-auto hover:opacity-80 transition-opacity">
              <Image
                src="/images/Echelon_Logo.png"
                alt="Echelon Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-gray-400">We've sent a password reset link</p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-slate-600/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">Email Sent!</h2>
                <p className="text-gray-400 mb-6">
                  We've sent a password reset link to <span className="text-blue-400 font-semibold">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Check your inbox and follow the instructions to reset your password.
                </p>
                <Link
                  href="/login"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 block"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-slate-900/20 pointer-events-none"></div>
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-slate-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center justify-center w-20 h-20 mb-4 mx-auto hover:opacity-80 transition-opacity">
            <Image
              src="/images/Echelon_Logo.png"
              alt="Echelon Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-gray-400">No worries, we'll send you reset instructions</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-slate-600/20 rounded-2xl blur-xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
