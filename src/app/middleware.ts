import NextAuth from "next-auth";
import authConfig from "../../auth.config";

export { auth as middleware } from "@/auth";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware() {});

export const config = {
  matcher: ["/dashboard/:path*"],
};
