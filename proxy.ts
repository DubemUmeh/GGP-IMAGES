import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPaid = true;

export function proxy(request: NextRequest) {
  if (!isPaid) {
    return NextResponse.redirect(
      "https://www.google.com/search?q=dubem+umeh"
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon_io).*)"],
};
