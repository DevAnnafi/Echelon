// app/auth/callback/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Auth error:', error);
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/error?message=${encodeURIComponent(error.message)}`
        );
      }

      // Redirect to sign in page after successful confirmation
      return NextResponse.redirect(`${requestUrl.origin}/login`);
    } catch (err) {
      console.error('Callback error:', err);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?message=An unexpected error occurred`
      );
    }
  }

  // No code provided, redirect to sign up
  return NextResponse.redirect(`${requestUrl.origin}/register`);
}