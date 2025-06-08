// middleware.ts
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicPaths = ["/sign-in", "/sign-up", "/"];

export function middleware(req: NextRequest) {
  const { userId } = getAuth(req);
  const pathname = req.nextUrl.pathname;

  // Si es ruta pública, dejar pasar
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Si no está autenticado y la ruta no es pública,
  // NO redirigir para permitir que Next.js muestre 404 si no existe
  if (!userId) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|.*\\..*).*)",
};
