import { createBrowserClient, createServerClient, serializeCookieHeader } from '@supabase/ssr'
import { type GetServerSidePropsContext } from 'next'
import { NextResponse, type NextRequest } from "next/server";

export function createSupabaseServerClientFromContext({ req, res }: GetServerSidePropsContext) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC__SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || "" })),
        setAll: (cookiesToSet) => {
          res.setHeader(
            "Set-Cookie",
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );
}


export function createSupabaseMiddlewareClient(req: NextRequest, res: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC__SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );
}

export function createComponentClient(){
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC__SUPABASE_ANON_KEY!
  )

  return supabase;
}