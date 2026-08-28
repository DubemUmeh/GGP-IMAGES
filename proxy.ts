import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPaid = true;

export function proxy(request: NextRequest) {
  if (!isPaid) {
    return NextResponse.redirect(
      "https://www.google.com/search?q=dubem+umeh&oq=dubem+umeh&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgNGIAEMgkIAhAAGA0YgAQyCQgDEAAYDRiABDIJCAQQABgNGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg8MgoICBAAGIAEGKIEMgcICRAAGO8FMgoIChAAGIAEGKIEMgoICxAAGIAEGKIEMgcIDBAAGO8FMgcIDRAhGI8CMgcIDhAhGI8C0gEIMzgwM2owajSoAgKwAgE&client=ms-android-xiaomi-rvo3&sourceid=chrome-mobile&source=chrome.ob&ie=UTF-8"
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon_io).*)"],
};
