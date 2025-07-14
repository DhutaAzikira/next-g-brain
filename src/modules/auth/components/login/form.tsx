"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputPassword } from "@/components/ui/password";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { initialActionState } from "@/types/action.type";
import { credentialsLogin } from "../../services/login.service";
import { toast } from "sonner";

export function LoginFormAction() {
  const [state, action, isPending] = useActionState(credentialsLogin, initialActionState);

  const errors = typeof state.errors === "object" ? state.errors : null;

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((c) => c.split("="))
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

    const targetCookie = cookies["token"];
    if (targetCookie) {
      window.location.reload();
    }

    if (state.message) {
      if (targetCookie) {
        toast.success("Selamat Datang!");
      } else {
        toast.error("Username atau password salah");
      }
    }
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="space-y-4">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="username"
          placeholder="username"
          defaultValue={state.inputs?.username}
          autoFocus
          required
        />
        {errors?.username && (
          <ul className="text-destructive space-y-1 text-sm">
            {errors.username.map((err, idx) => {
              return (
                <li key={idx} className="list-inside list-disc">
                  {err}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="password">Password</Label>
        <InputPassword
          id="password"
          name="password"
          placeholder="●●●●●●●●"
          defaultValue={state.inputs?.password}
          required
        />
        {errors?.password && (
          <ul className="text-destructive space-y-1 text-sm">
            {errors.password.map((err, idx) => {
              return (
                <li key={idx} className="list-inside list-disc">
                  {err}
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              name="remember"
              defaultChecked={state.inputs?.remember || false}
              className="data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
            />
            <Label
              htmlFor="remember"
              className="text-muted-foreground peer-checked:text-foreground text-xs font-normal"
            >
              Ingat saya
            </Label>
          </div>

          <Link
            href="forgot-password"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors duration-500 hover:underline"
          >
            Lupa password?
          </Link>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-gradient-purple h-12 w-full hover:opacity-80"
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : "Masuk"}
      </Button>
    </form>
  );
}
