"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Home from "../components/Home";
import SignIn from "../components/SignIn";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 flex items-center justify-center animate-orbit">
              <div className="w-4 h-4 bg-white rounded-full shadow-lg opacity-80" />
            </div>
            <Image
              src="/hubBlanco.png"
              alt="Cargando..."
              width={150}
              height={150}
              className="rounded-[20px] z-10 relative shadow-xl"
            />
          </div>
          <p className="text-white text-lg tracking-wide flex items-center gap-1">
            <span className="flex items-center gap-1 ml-2">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot delay-[0ms]"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot delay-[150ms]"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot delay-[300ms]"></span>
            </span>
          </p>
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen">
        <SignIn />
      </main>
    );
  }

  return (
    <div>
      <Home />
    </div>
  );
}
