import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Auth is not yet wired up — bounce everyone to home until Supabase session
// checking is implemented here.
export default function AdminLayout() {
  redirect('/');
}
