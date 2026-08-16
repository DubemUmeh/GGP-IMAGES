/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */
import 'server-only';
import { NextResponse } from 'next/server';
import { query } from './db';
import { sessionAdminId } from './session';
import type { AdminContext, PermissionName } from './types';
export class HttpError extends Error { constructor(public status:number, message:string){ super(message); } }
export async function currentAdmin(): Promise<AdminContext|null>{ const id=await sessionAdminId(); if(!id) return null; const res=await query<any>(`select a.id,a.email,a.name,a.avatar_url as "avatarUrl",r.id as role_id,r.name as role_name,r.is_super_admin, coalesce(array_agg(p.name) filter (where p.name is not null),'{}') as permissions from admins a join roles r on r.id=a.role_id left join role_permissions rp on rp.role_id=r.id left join permissions p on p.id=rp.permission_id where a.id=$1 and a.is_active=true group by a.id,r.id`,[id]); const row=res.rows[0]; if(!row) return null; return {id:row.id,email:row.email,name:row.name,avatarUrl:row.avatarUrl,role:{id:row.role_id,name:row.role_name,isSuperAdmin:row.is_super_admin},permissions:row.permissions}; }
export async function requireAdmin(){ const admin=await currentAdmin(); if(!admin) throw new HttpError(401,'Unauthorized'); return admin; }
export async function requirePermission(permission:PermissionName){ const admin=await requireAdmin(); if(!admin.role.isSuperAdmin && !admin.permissions.includes(permission)) throw new HttpError(403,'Forbidden'); return admin; }
export function apiError(error:unknown){ if(error instanceof HttpError) return NextResponse.json({message:error.message},{status:error.status}); console.error(error); return NextResponse.json({message:'Internal server error'},{status:500}); }
export function hasPermission(admin:AdminContext, permission:PermissionName){ return admin.role.isSuperAdmin || admin.permissions.includes(permission); }
