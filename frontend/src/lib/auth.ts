import { supabase } from "./supabaseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Get the current authenticated user from Supabase
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

/**
 * Get the current session from Supabase
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session;
}

/**
 * Get the server session from NextAuth (for server components)
 */
export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}