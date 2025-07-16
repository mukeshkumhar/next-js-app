import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  function middleware() {
    return NextResponse.next();
    
  },
  {
    callbacks: {
        authorized: ({req, token}) => {

            const {pathname} = req.nextUrl;
            if (
                pathname.startsWith("/api/auth") || 
                pathname.startsWith("/login") || 
                pathname.startsWith("/register")) 
                {
                return true;
            }
            if(pathname === "/" || pathname.startsWith("/api/video")) {
                return true;
            }
            return !!token;
        },
    },
  }
);

export const config = {
  matcher: [
    // Match all paths except for the login and register pages
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
