import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createSupabaseMiddlewareClient(req, res);

  const { data: { user }, error } = await supabase.auth.getUser();

  const publicPaths = ["/login", "/register"];
  const isPrivate = !publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

  if (isPrivate && (!user || error)) {;
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/public).*)"],
};
