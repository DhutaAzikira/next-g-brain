import { OtpView } from "@/modules/auth/views/otp.view";

export default async function VerificationOtpPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = { id };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <OtpView user={user} />
    </div>
  );
}
