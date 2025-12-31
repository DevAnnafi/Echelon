// app/auth/error/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'An authentication error occurred';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-slate-900/20 pointer-events-none"></div>
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Authentication Error</h1>
          <p className="text-gray-400">Something went wrong with your account verification</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-slate-600/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">Verification Failed</h2>
              <p className="text-sm text-gray-400 mb-8">
                {message}
              </p>
              
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 block"
                >
                  Back to Sign In
                </Link>
                <Link
                  href="/"
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all duration-200 block"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          Need help?{' '}
          <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}