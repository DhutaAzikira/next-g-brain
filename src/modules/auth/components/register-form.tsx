"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/password";
import { register } from "../services/register.service";
import { initialActionState } from "@/types/action.type";

type RegisterFormProps = {
  onSuccess?: (email: string) => void;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [state, action, isPending] = useActionState(register, initialActionState);
  const error = typeof state.errors === "object" ? state.errors : null;

  useEffect(() => {
    if (state.success && state.data) {
      onSuccess?.(state.data);
    }

    if (!state.success && state.message && typeof state.errors === "string") {
      toast.error(state.message, { description: state.errors });
    }
  }, [onSuccess, state.data, state.success]);

  return (
    <CardContent>
      <form action={action} className="space-y-6">
        <div className="space-y-2">
          <CardTitle>Buat Akun Baru</CardTitle>
          <CardDescription>Mulailah perjalanan Anda bersama kami.</CardDescription>
        </div>

        {/* Username */}
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username*"
          autoFocus
          defaultValue={state.inputs?.username}
          required
          disabled={isPending}
        />
        {error?.username && (
          <ul className="text-destructive space-y-1 text-sm">
            {error.username.map((err, idx) => (
              <li key={idx} className="list-inside list-disc">
                {err}
              </li>
            ))}
          </ul>
        )}

        {/* Email */}
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Alamat Email*"
          defaultValue={state.inputs?.email}
          required
          disabled={isPending}
        />
        {error?.email && (
          <ul className="text-destructive space-y-1 text-sm">
            {error.email.map((err, idx) => (
              <li key={idx} className="list-inside list-disc">
                {err}
              </li>
            ))}
          </ul>
        )}

        {/* Password */}
        <InputPassword
          id="password"
          name="password"
          placeholder="Kata Sandi*"
          defaultValue={state.inputs?.password}
          required
          disabled={isPending}
        />
        {error?.password && (
          <ul className="text-destructive space-y-1 text-sm">
            {error.password.map((err, idx) => (
              <li key={idx} className="list-inside list-disc">
                {err}
              </li>
            ))}
          </ul>
        )}

        {/* Confirm Password */}
        <InputPassword
          id="confirm-password"
          name="confirmPassword"
          placeholder="Ulang Kata Sandi*"
          autoComplete="off"
          defaultValue={state.inputs?.confirmPassword}
          required
          disabled={isPending}
        />
        {error?.confirmPassword && (
          <ul className="text-destructive space-y-1 text-sm">
            {error.confirmPassword.map((err, idx) => (
              <li key={idx} className="list-inside list-disc">
                {err}
              </li>
            ))}
          </ul>
        )}

        <Button type="submit" disabled={isPending} className="h-12 w-full">
          {isPending ? "Mendaftar..." : "Daftar Sekarang"}
        </Button>
        <div className="text-center text-sm leading-none font-light">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-foreground/90 hover:text-foreground font-medium transition-colors duration-500 hover:underline"
          >
            Masuk disini.
          </Link>
        </div>
      </form>
    </CardContent>
  );
}
