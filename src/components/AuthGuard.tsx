"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicPaths = ["/sign-in", "/sign-up", "/"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // siempre al inicio
  const { isLoaded, isSignedIn } = useAuth(); // siempre al inicio
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  // Previene render condicional de hooks
  const isPublic = publicPaths.includes(pathname);

  useEffect(() => {
    if (!isPublic && isLoaded && !isSignedIn && !hasRedirected) {
      setHasRedirected(true);
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, hasRedirected, router, isPublic]);

  if (!isLoaded || (!isPublic && hasRedirected)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 flex items-center justify-center animate-orbit">
              <div className="w-4 h-4 bg-white rounded-full shadow-lg opacity-80" />
            </div>
            <Image
              src="/hubw.png"
              alt="Cargando..."
              width={150}
              height={150}
              className="rounded-[20px] z-10 relative shadow-xl"
            />
          </div>
          <p className="text-white text-lg tracking-wide flex items-center gap-1">
            <span className="flex items-center gap-1 ml-2">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot delay-[0ms]" />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot delay-[150ms]" />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot delay-[300ms]" />
            </span>
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
