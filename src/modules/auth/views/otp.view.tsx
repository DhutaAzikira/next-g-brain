import { CircleQuestionMark, Mail } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { OtpForm } from "../components/otp-form";

export function OtpView({ user }: { user: { id: string } }) {
  return (
    <Card className="w-full max-w-md">
      <div className="space-y-2">
        <div className="bg-gradient-green mx-auto flex size-20 items-center justify-center rounded-full">
          <CircleQuestionMark className="size-10 text-white" />
        </div>
        <CardTitle className="text-center text-lg leading-none font-bold md:text-2xl">
          Verifikasi OTP
        </CardTitle>
        <CardDescription className="text-center">
          Masukkan kode 6 digit yang telah dikirim ke:
        </CardDescription>
      </div>

      <div className="px-6 font-sans">
        <div className="flex h-11 w-full items-center justify-center gap-1.5 rounded-md bg-purple-200 text-sm text-purple-700">
          <Mail className="size-4" />
          <span className="block text-sm leading-none">{user.id}</span>
        </div>
      </div>

      <CardContent className="px-6.5">
        <OtpForm />
      </CardContent>
    </Card>
  );
}
