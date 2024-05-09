import { NextRequest, NextResponse } from 'next/server';

// Function to validate token (replace with your actual logic)
function isValidToken(token: string): boolean {
  // Implement your token validation logic here (e.g., using a library like 'jsonwebtoken')
  // This example assumes a simple check, but you'll need a more robust implementation
  return token === 'valid_token_example'; // Replace with actual validation
}

function isApiRoute(request: NextRequest): boolean {
  return request.nextUrl.pathname.startsWith('/api'); // Check for API routes
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl; // Get the current URL object

  // Check if the requested path is the login route
  if (url.pathname === '/login') {
    return NextResponse.next(); // Allow access to login route
  }

  // Check if a valid token exists in the cookies
  const token = request.cookies.get('token')?.value || '';

  // Handle API routes differently (e.g., return error response if invalid token)
  if (isApiRoute(request)) {
    if (!isValidToken(token)) {
      // Customize error response for invalid tokens in API requests
      return new Response('Unauthorized', { status: 401 });
    }
    return NextResponse.next(); // Allow access to valid API requests
  }

  // Handle non-API routes (redirect if invalid token)
  if (!isValidToken(token)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access for valid non-API routes (e.g., static assets)
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Match all requests (except for `/login` due to middleware logic)
};

export default middleware; // Export the middleware for usage
