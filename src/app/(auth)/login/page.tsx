"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-slate-900/20 pointer-events-none"></div>
      
      {/* Animated gradient orbs */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-slate-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
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
          <p className="text-gray-400">Sign in to continue your journey</p>
      </div>

        {/* Form Card */}
        <div className="relative">
          {/* Card background with gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-slate-600/20 rounded-2xl blur-xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
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
              />
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="ml-2">→</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10"></div>
              <span className="text-xs text-gray-500">or</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Google Button */}
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white py-3 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>

              {/* Apple Button */}
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white py-3 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 13.5c-.1 2.48 2.08 3.7 2.16 3.73-.09.3-.33.93-1.08 1.85-.62.8-1.27 1.59-2.29 1.59-1 0-1.3-.6-2.42-.6-1.14 0-1.46.6-2.43.6-1.04 0-1.67-.78-2.3-1.59-1.26-1.63-2.23-4.62-1.84-7.43.18-1.42 1.17-2.72 2.32-3.45 1.08-.68 2.68-.64 3.56.27.6.6 1.15.61 1.82.25 1.05-.56 1.84-.14 2.3.6-.85 1.14-.73 2.8-.17 3.83zm-3.76-9.47c.47-.58.75-1.42.66-2.25-.64.03-1.42.43-1.89 1-.44.5-.82 1.31-.73 2.08.72.05 1.47-.37 1.96-.83z"/>
                </svg>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}