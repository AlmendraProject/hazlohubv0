"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// ✅ Esquema de validación con Zod
const signInSchema = z.object({
  email: z.string().email({ message: "Correo no válido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type SignInData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sección izquierda con el formulario */}
      <div className="w-1/2 flex items-center justify-center bg-white rounded-r-[30px] shadow-xl overflow-hidden">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Inicia sesión</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu Password"
                {...register("password")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-600 hover:text-gray-900"
                tabIndex={-1}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error general */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-black text-white"
              disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>

          <p className="mt-6 text-center text-sm text-gray-500">
            Reserva, disfruta de lo bueno
          </p>
        </div>
      </div>

      {/* Sección derecha con la imagen */}
      <div className="w-1/2 bg-black flex flex-col items-center justify-center text-white">
        <Image src="/hubw.png" width={300} height={300} alt="Logo" />
        <h2 className="text-3xl mt-4">HazloHub</h2>
      </div>
    </div>
  );
};

export default SignIn;
