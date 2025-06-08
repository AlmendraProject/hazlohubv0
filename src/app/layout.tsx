import "@/app/globals.css";
import AuthGuard from "@/components/AuthGuard"; // importa el guard
import BottomNavMobile from "@/components/BottomNavMobile";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HazloHub - Encuentra tu trabajo ideal",
  description:
    "Encuentra tu trabajo ideal en HazloHub, la plataforma que conecta a profesionales con oportunidades laborales. Explora ofertas de empleo, postúlate fácilmente y construye tu carrera con nosotros.",
  icons: {
    icon: "/hubWeb.png",
  },
};

export const viewport = {
  themeColor: "#1d4ed8",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  // Si la ruta es pública, no usar guard
  const isPublicRoute = ["/sign-in", "/sign-up"].includes(
    params?.pathname || ""
  );

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            {isPublicRoute ? children : <AuthGuard>{children}</AuthGuard>}
            <BottomNavMobile />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
