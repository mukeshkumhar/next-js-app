import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  function middleware() {
    return NextResponse.next();
    
  },
  {
    callbacks: {
        authorized: ({ req, token }) => {
            const { pathname } = req.nextUrl;
            if (
                pathname.startsWith("/api/auth") ||
                pathname.startsWith("/login") ||
                pathname.startsWith("/register")
            ) {
                return true;
            }
            if (pathname === "/" || pathname.startsWith("/api/video")) {
                return true;
            }
            // Only allow access if token exists (user is authenticated)
            return !!token;
        },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
