import { User } from "lucide-react";

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "../components/login";

export function LoginView() {
  return (
    <Card className="w-full max-w-md">
      <div className="mb-2 space-y-2">
        <div className="bg-gradient-purple mx-auto mb-4 flex size-20 items-center justify-center rounded-full">
          <User className="size-10 text-white" />
        </div>
        <CardTitle className="text-center text-lg leading-none font-bold md:text-2xl">
          Masuk ke Dashboard
        </CardTitle>
        <CardDescription className="text-center">Pusat Kendali Interview Anda</CardDescription>
      </div>

      <CardContent className="space-y-6">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
