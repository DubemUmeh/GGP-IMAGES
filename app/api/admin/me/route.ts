import { NextResponse } from 'next/server';
import { apiError, currentAdmin } from '@/lib/admin/auth';
export async function GET(){ try { const admin=await currentAdmin(); if(!admin) return NextResponse.json({authenticated:false},{status:401}); return NextResponse.json({authenticated:true,admin}); } catch(e){ return apiError(e); } }
