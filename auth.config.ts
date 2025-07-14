import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin, type NextAuthConfig, type DefaultSession, type User } from "next-auth";

import { tryCatch } from "@/utils/try-catch";
import { getLoginCredentials } from "@/modules/auth/services/login.service";

declare module "next-auth" {
  interface Session {
    user: {
      user: string;
      username: string;
      full_name: string;
      phone_number: string;
      email: string;
      date_of_birth: string;
      gender: string;
      bio: string;
    } & DefaultSession["user"];
    sessionToken?: string;
  }
  interface User {
    user: string;
    username: string;
    full_name: string;
    phone_number: string;
    email: string;
    date_of_birth: string;
    gender: string;
    bio: string;
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        remember: {
          label: "Remember me",
          type: "checkbox",
        },
      },
      async authorize(credentials) {
        let user = null;

        const [res, err] = await tryCatch(
          getLoginCredentials({
            username: (credentials?.username as string) ?? "",
            password: (credentials?.password as string) ?? "",
            remember: (credentials?.remember as boolean) ?? false,
          }),
        );

        if (err) {
          throw new InvalidLoginError("Invalid username or password");
        }

        user = res;

        if (!user) {
          throw new InvalidLoginError("Unexpected Error");
        }

        const trimUser: User = {
          id: user.id.toString(),
          email: user.email,
          name: user.full_name,
          image: user.profile_picture,
          username: user.username,
          date_of_birth: user.date_of_birth,
          gender: user.gender,
          phone_number: user.phone_number,
          full_name: user.full_name,
          user: user.user.toString(),
          bio: user.bio,
        };

        return trimUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
