import { Metadata } from "next";

import { LoginView } from "@/modules/auth/views/login.view";

export const metadata: Metadata = {
  title: "Masuk",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginView />
    </div>
  );
}
