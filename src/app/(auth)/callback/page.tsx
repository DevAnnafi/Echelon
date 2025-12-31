// app/auth/callback/page.tsx

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          router.push('/auth/error');
          return;
        }

        // Session is now established, redirect to login
        router.push('/login');
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/auth/error');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Confirming your email...</p>
    </div>
  );
}