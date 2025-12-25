// FILE: app/test-supabase/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestSupabase() {
  const [status, setStatus] = useState<string>("Testing...");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Check if client is initialized
        if (!supabase) {
          setStatus("❌ Supabase client not initialized");
          return;
        }
        setStatus("✅ Supabase client loaded");

        // Test 2: Try a simple query
        const { data, error, count } = await supabase
          .from("tasks")
          .select("*", { count: "exact" })
          .limit(1);

        if (error) {
          setResult(`❌ Query Error: ${error.message}`);
        } else {
          setResult(`✅ Connected! Found ${count} total tasks. Sample data: ${JSON.stringify(data?.[0], null, 2)}`);
        }
      } catch (err) {
        setResult(`❌ Connection Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg mb-4">
        <p className="text-lg font-semibold mb-2">{status}</p>
        <pre className="text-sm overflow-auto bg-white dark:bg-slate-950 p-3 rounded max-h-96">
          {result || "Waiting for results..."}
        </pre>
      </div>
      <a href="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </a>
    </div>
  );
}