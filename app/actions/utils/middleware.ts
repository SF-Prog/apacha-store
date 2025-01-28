import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAdmin } from '@/actions/isAdmin';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req) {
  const authHeader = req.headers.get('authorization');
  const supabase = createServerActionClient({ cookies })
  if (!authHeader) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const isAdminUser = await isAdmin(user.id);
  if (!isAdminUser) {
    return NextResponse.redirect(new URL('/not-authorized', req.url));
  }


  return NextResponse.next();
}