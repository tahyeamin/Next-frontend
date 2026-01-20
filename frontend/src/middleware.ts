import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ১. আমরা চেক করব ইউজার কোন পাথে যেতে চাইছে
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/register';
  
  // ২. কুকি থেকে টোকেন নেওয়ার চেষ্টা (NextJS সার্ভার সাইড)
  const token = request.cookies.get('token')?.value || '';

  // ৩. লজিক: যদি পাবলিক পেজে থাকে এবং টোকেন থাকে -> ড্যাশবোর্ডে পাঠাও
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  // ৪. লজিক: যদি প্রাইভেট পেজে (dashboard) থাকে এবং টোকেন না থাকে -> লগইনে পাঠাও
  if (!isPublicPath && !token && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// কোন কোন পাথে এই মিডলওয়্যার কাজ করবে
export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard/:path*',
  ],
};