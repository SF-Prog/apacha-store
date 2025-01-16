import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/actions/isAdmin';

export async function middleware(req) {
  const authHeader = req.headers.get('authorization');
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