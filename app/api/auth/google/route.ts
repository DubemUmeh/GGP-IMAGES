import { NextResponse } from 'next/server';
import { createOauthState } from '@/lib/admin/session';
import { googleAuthUrl } from '@/lib/admin/google';
export async function GET(){ const state=await createOauthState(); return NextResponse.redirect(googleAuthUrl(state)); }
