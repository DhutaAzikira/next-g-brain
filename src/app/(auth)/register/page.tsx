import { Metadata } from "next";

import { RegisterView } from "@/modules/auth/views/register.view";

export const metadata: Metadata = {
  title: "Daftar",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <RegisterView />
    </div>
  );
}
