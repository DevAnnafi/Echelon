"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (data.user && !data.user.confirmed_at) {
        setConfirmationSent(true);
        setSuccess(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setSuccess(true);
        // Account created without confirmation requirement
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmationSent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-slate-900/20 pointer-events-none"></div>
        <div className="fixed top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-slate-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

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
            <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
            <p className="text-gray-400">Check your inbox to confirm your account</p>
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
                <h2 className="text-xl font-semibold text-white mb-3">Account Created!</h2>
                <p className="text-gray-400 mb-6">
                  We've sent a confirmation email to <span className="text-blue-400 font-semibold">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Click the link in the email to verify your account and start using Echelon.
                </p>
                <button
                  onClick={() => setConfirmationSent(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Back to Sign Up
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-8">
            Didn't receive the email?{' '}
            <button
              onClick={() => setConfirmationSent(false)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-slate-900/20 pointer-events-none"></div>
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-slate-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

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
          <h1 className="text-3xl font-bold text-white mb-2">Echelon</h1>
          <p className="text-gray-400">Sign Up To Level Up Your Life</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-slate-600/20 rounded-2xl blur-xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-6">
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

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-8">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms & Privacy Checkbox */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded bg-white/10 border border-white/20 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    I agree to the{' '}
                    <Link href="/terms" target="_blank" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading || !agreeToTerms}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="ml-2">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Already have account */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-8">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}