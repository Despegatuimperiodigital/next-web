// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Configure rate limiting
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60 s'),
});

export async function middleware(request) {
  // Get token
  const token = await getToken({ req: request });
  
  // Check authentication
  if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const { success, limit, reset, remaining } = await rateLimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      }
    );
  }
  
  // Logging
  console.log({
    method: request.method,
    path: request.nextUrl.pathname,
    userId: token?.sub,
    timestamp: new Date().toISOString()
  });
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};