"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mi perfil</h1>
        <SignOutButton>
          <Button variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </SignOutButton>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <UserProfile path="/profile" routing="path" />
      </div>
    </div>
  );
}
