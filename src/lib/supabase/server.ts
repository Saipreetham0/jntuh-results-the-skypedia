// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

export async function createClient() {
  // const cookieStore = await cookies()

  // return createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       getAll() {
  //         return cookieStore.getAll()
  //       },
  //       setAll(cookiesToSet) {
  //         try {
  //           cookiesToSet.forEach(({ name, value, options }) =>
  //             cookieStore.set(name, value, options)
  //           )
  //         } catch {
  //           // The `setAll` method was called from a Server Component.
  //           // This can be ignored if you have middleware refreshing
  //           // user sessions.
  //         }
  //       },
  //     },
  //   }
  // )
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  } as any;
}