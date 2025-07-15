import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LoginFormAction } from "./form";
import { sleep } from "@/utils/helper";

export async function LoginForm() {
  const session = await auth();

  if (session?.user) {
    await sleep(750);
    redirect("/dashboard");
  }

  return (
    <div className="w-full space-y-6">
      {/* <div className="flex flex-col gap-2">
        <form action={googleLogin} className="w-full">
          <Button type="submit" variant="outline" className="w-full after:flex-1">
            <span className="pointer-events-none me-2 flex-1">
              <RiGoogleFill className="size-5 text-red-500" aria-hidden="true" />
            </span>
            Masuk dengan Google
          </Button>
        </form>

        <Button variant="outline" className="after:flex-1">
          <span className="pointer-events-none me-2 flex-1">
            <RiLinkedinBoxFill className="size-5 text-blue-600" aria-hidden="true" />
          </span>
          Masuk dengan LinkedIn
        </Button>
      </div> */}

      {/* <div className="strip relative mb-6 w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center">
        <div className="bg-card text-muted-foreground relative z-10 mx-auto w-fit px-2 text-xs font-medium transition-colors duration-500">
          Atau masuk dengan.
        </div>
      </div> */}

      {/* Login Form Action */}
      <LoginFormAction />

      <div className="flex items-center justify-center">
        <Link
          href="/register"
          className="bg-card text-muted-foreground hover:text-foreground relative z-10 px-2 font-medium transition-colors duration-500 hover:underline"
        >
          Belum punya akun?
        </Link>
      </div>
    </div>
  );
}
