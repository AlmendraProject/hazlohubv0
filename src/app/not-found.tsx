"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-center overflow-hidden px-4">
      {/* Luces de colores en las esquinas */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-green-500 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-400 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 opacity-20 blur-3xl rounded-full pointer-events-none" />

      {/* Contenido */}
      <div className="z-10 flex flex-col items-center">
        <div className="relative w-[250px] h-[250px] mb-8">
          <Image
            src="/404.png"
            alt="Página no encontrada"
            fill
            className="object-contain"
          />
        </div>

        <p className="text-xl mb-6 text-gray-300">
          Oops, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition font-semibold shadow-lg">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
