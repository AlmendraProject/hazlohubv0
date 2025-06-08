"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sección izquierda con el logo */}
      <div className="w-1/2 bg-black flex flex-col items-center justify-center text-white">
        <Image src="/hubw.png" width={300} height={300} alt="Logo" />
        <h2 className="text-3xl mt-4">MaluzHub</h2>
      </div>

      {/* Sección derecha con el formulario */}
      <div className="w-1/2 flex items-center justify-center bg-white rounded-l-[30px] shadow-xl overflow-hidden">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Crea tu cuenta gratis</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your Full Name here"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your Email here"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your Password here"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full bg-black text-white">
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>

          <p className="mt-6 text-center text-sm text-gray-500">
            Reserva disfruta de lo bueno
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
