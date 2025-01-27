import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publicRoutes = [ '/','/login', '/verify', '/public','/admin/login','/assets'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('CBaccessToken')?.value;

  if(request.nextUrl.pathname == "/" && token){
    const dashboard = new URL('/dashboard/page',request.url);
    return NextResponse.redirect(dashboard);
  }

  const isHome = request.nextUrl.pathname == "/";

  if (isHome) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/',request.url);
    return NextResponse.redirect(loginUrl,);
  }

  return NextResponse.next();
}

// Define the matcher to apply the middleware to all routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Exclude static files and assets
};
