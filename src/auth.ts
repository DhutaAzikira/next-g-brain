import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { googleSession } from "./modules/auth/services/login.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.phone_number = user.phone_number;
        token.date_of_birth = user.date_of_birth;
        token.gender = user.gender;
        token.user = user.user;
      }

      if (account && account.provider === "google") {
        const res = await googleSession(account.access_token || "");

        console.log("res from google auth", res);

        token.accessToken = account.access_token;
        token.id = user?.id;
        token.email = user?.email;
        token.username = user?.username;
        token.phone_number = user?.phone_number;
        token.date_of_birth = user?.date_of_birth;
        token.gender = user?.gender;
        token.user = user?.user;
        token.bio = user?.bio;
        token.image = user?.image;

        return { ...token, accessToken: token.accessToken };
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.phone_number = token.phone_number as string;
        session.user.date_of_birth = token.date_of_birth as string;
        session.user.gender = token.gender as string;
        session.user.user = token.user as string;
      }
      session.sessionToken = token.accessToken as string;
      return session;
    },
  },
  ...authConfig,
});
