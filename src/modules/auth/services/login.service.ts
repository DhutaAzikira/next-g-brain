"use server";

import { cookies } from "next/headers";

import { signIn } from "@/auth";
import { ActionState } from "@/types/action.type";
import { UserType } from "@/types/auth.type";
import { tryCatch } from "@/utils/try-catch";
import { loginSchema, LoginSchemaType } from "../schemas/login.schema";
import { flattenError } from "@/lib/zod";
import { handleActionError } from "@/lib/handler-action-error";
import { apiServer } from "@/lib/api-server";
import { IGoogleAuthResponse } from "@/types/response.type";

export async function googleLogin() {
  await signIn("google");
}

export async function googleSession(accessToken: string): Promise<UserType | null> {
  const cookiesStore = await cookies();

  const [res, err] = await tryCatch(
    apiServer({
      method: "POST",
      url: "/api/auth/google/",
      body: JSON.stringify({ access_token: accessToken }),
    }),
  );

  if (err) {
    console.log("error google auth", err);
    return null;
  }

  const data = (await res.json()) as IGoogleAuthResponse;
  const token = data.key;
  cookiesStore.set("token", token, { maxAge: 60 * 60 * 24 * 30 });

  const [resGetProfile] = await tryCatch(
    apiServer({
      url: "/api/profile/",
      headers: { Authorization: `Token ${token}` },
      method: "GET",
    }),
  );

  if (!resGetProfile?.ok) {
    const [resProfile, errProfile] = await tryCatch(
      apiServer({
        url: "/api/profile/",
        method: "POST",
        body: JSON.stringify({
          user: data.user.pk,
          full_name: data.user.first_name + ` ${data.user.last_name}`,
          email: data.user.email,
          profile_picture: data.user.profile_picture,
        }),
      }),
    );

    if (errProfile) {
      console.log("error google auth profile", errProfile);
    }

    const responseData = (await resProfile?.json()) as UserType;

    return {
      id: data.user.pk,
      user: data.user.pk,
      email: data.user.email,
      username: data.user.username,
      full_name: data.user.first_name + ` ${data.user.last_name}`,
      phone_number: responseData.phone_number,
      date_of_birth: responseData.date_of_birth,
      gender: responseData.gender,
      profile_picture: data.user.profile_picture,
      bio: responseData.bio,
      created_at: responseData.created_at,
    };
  }

  const response = (await resGetProfile.json()) as UserType;

  return {
    id: response.id,
    user: response.user,
    email: response.email,
    username: response.username,
    full_name: response.full_name,
    phone_number: response.phone_number,
    date_of_birth: response.date_of_birth,
    gender: response.gender,
    profile_picture: response.profile_picture,
    bio: response.bio,
    created_at: response.created_at,
  };
}

export async function getLoginCredentials({
  username,
  password,
  remember,
}: {
  username: string;
  password: string;
  remember: boolean;
}): Promise<UserType | null> {
  const cookiesStore = await cookies();

  const [responseLogin, errorLogin] = await tryCatch(
    apiServer({
      method: "POST",
      url: "/api/login/",
      body: JSON.stringify({ username, password }),
    }),
  );

  if (errorLogin) {
    console.log("error get token");
    return null;
  }

  const data = await responseLogin.json();
  const token = data.token;

  const maxAge = 60 * 60 * 24 * (remember ? 30 : 7);

  cookiesStore.delete("register-token");
  cookiesStore.delete("token");
  cookiesStore.set("token", token, { maxAge });

  const [responseToken, errorToken] = await tryCatch(
    apiServer({
      url: "/api/profile",
      headers: { Authorization: `Token ${token}` },
    }),
  );

  if (errorToken) return null;

  const tokenData = await responseToken.json();

  return tokenData as UserType;
}

type CredentialActionType = ActionState<LoginSchemaType, string>;

export async function credentialsLogin(
  state: CredentialActionType,
  formData: FormData,
): Promise<CredentialActionType> {
  try {
    const payload = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      remember: formData.get("remember") === "on",
    };

    const validateData = await loginSchema.safeParseAsync(payload);

    if (!validateData.success)
      return {
        success: false,
        message: "Username atau password salah",
        errors: flattenError(validateData.error).fieldErrors,
        inputs: state.inputs,
      };

    await signIn("credentials", {
      username: validateData.data.username,
      password: validateData.data.password,
      remember: validateData.data.remember,
    });

    return {
      success: true,
      message: "Berhasil masuk",
      data: null,
    };
  } catch (error) {
    const errors = handleActionError(error);
    return {
      success: false,
      message: "Unexpected Error",
      errors,
      inputs: state.inputs,
    };
  }
}
