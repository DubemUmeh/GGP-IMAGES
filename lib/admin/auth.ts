import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { query } from "./db";
import { sessionAdminId } from "./session";
import type { AdminContext } from "./types";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function currentAdmin(): Promise<AdminContext | null> {
  const id = await sessionAdminId();
  if (!id) return null;

  const res = await query<any>(
    `select id,email,name,avatar_url as "avatarUrl" from admins where id=$1 and is_active=true`,
    [id],
  );
  const row = res.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatarUrl: row.avatarUrl,
  };
}

export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) throw new HttpError(401, "Unauthorized");
  return admin;
}

export function apiError(error: unknown) {
  if (error instanceof HttpError)
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  if (error instanceof ZodError)
    return NextResponse.json(
      { message: "Invalid input", issues: error.issues },
      { status: 400 },
    );
  console.error(error);
  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 },
  );
}
