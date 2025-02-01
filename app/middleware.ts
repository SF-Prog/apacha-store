import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { isAdmin } from '@/actions/is-current-user-admin'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if we have a session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminPanelUrl = req.nextUrl.pathname.includes('/admin');

  if (!user && isAdminPanelUrl) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Check if the user is an admin
  const isAdminUser = await isAdmin(user.email);
  if (!isAdminUser) {
    return NextResponse.redirect(new URL('/not-authorized', req.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
}





// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { createSsrClient } from '@/lib/supabase'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createSsrClient();

//   // Check if we have a session
//   const { data: { user } } = await supabase.auth.getUser();
// console.log('session', user);
//   const isAdminPanelUrl = req.nextUrl.pathname.startsWith('/admin')
  
//   if (!user && isAdminPanelUrl) {
//     return NextResponse.redirect(new URL('/admin/login', req.url))
//   }

//   if (user && isAdminPanelUrl) {
//     // Check if the user is an admin
//     const { data: adminData } = await supabase
//       .from('admin_users')
//       .select('*')
//       .eq('email', user.email)
//       .single()

//     if (!adminData) {
//       return NextResponse.redirect(new URL('/not-authorized', req.url))
//     }
//   }

//   return res
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }