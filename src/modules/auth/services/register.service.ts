"use server";

import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { format } from "date-fns";

import { ActionState } from "@/types/action.type";
import {
  registerProfileSchema,
  RegisterProfileSchemaType,
  registerSchema,
  RegisterSchemaType,
} from "../schemas/register.schema";
import { handleActionError } from "@/lib/handler-action-error";
import { flattenError } from "@/lib/zod";
import { tryCatch } from "@/utils/try-catch";
import { apiServer } from "@/lib/api-server";
import { supabase } from "@/utils/supabase/client";
import { IRegisterResponse } from "@/types/response.type";

type RegisterActionType = ActionState<RegisterSchemaType, string>;

export async function register(
  state: RegisterActionType,
  formData: FormData,
): Promise<RegisterActionType> {
  try {
    const payload = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validateData = await registerSchema.safeParseAsync(payload);

    if (!validateData.success)
      return {
        success: false,
        message: "Periksa kembali data yang Anda masukkan",
        errors: flattenError(validateData.error).fieldErrors,
        inputs: payload,
      };

    const [res, err] = await tryCatch(
      apiServer({
        method: "POST",
        url: "/api/register/",
        body: JSON.stringify({
          username: validateData.data.username,
          email: validateData.data.email,
          password: validateData.data.password,
        }),
      }),
    );

    if (err) {
      console.log("error register", err);
      return {
        success: false,
        message: "Gagal mendaftar",
        errors: err.message,
        inputs: payload,
      };
    }

    const response = (await res.json()) as IRegisterResponse;

    (await cookies()).set("register-token", response.token, { maxAge: 60 * 60 * 24 * 7 });

    return {
      success: true,
      message: "Berhasil mendaftar",
      data: payload.email,
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

type RegisterProfileActionType = ActionState<RegisterProfileSchemaType, string>;

export async function registerProfile(
  state: RegisterProfileActionType,
  formData: FormData,
): Promise<RegisterProfileActionType> {
  try {
    const payload: RegisterProfileSchemaType = {
      profile_picture: formData.get("profile_picture") as File,
      full_name: formData.get("full_name") as string,
      phone_number: formData.get("phone_number") as string,
      date_of_birth: formData.get("date_of_birth") as string,
      gender: formData.get("gender") as RegisterProfileSchemaType["gender"],
      bio: formData.get("bio") as string,
    };

    const validateData = await registerProfileSchema.safeParseAsync(payload);

    if (!validateData.success) {
      console.log(flattenError(validateData.error).fieldErrors);
      return {
        success: false,
        message: "Periksa kembali data yang Anda masukkan",
        errors: flattenError(validateData.error).fieldErrors,
        inputs: payload,
      };
    }

    const { profile_picture, date_of_birth, ...restPayload } = validateData.data;

    const bucket = "user-profiles";
    const placeholder = nanoid(10);
    const path = `public/${placeholder}-${profile_picture?.name ?? placeholder}`;

    if (
      profile_picture?.size &&
      profile_picture?.size > 0 &&
      profile_picture?.type?.startsWith("image/")
    ) {
      const supa = await supabase()
        .storage.from(bucket)
        .upload(path, profile_picture as File);

      if (supa.error) {
        console.log("supabase error", supa.error);

        return {
          success: false,
          message: "Gagal mendaftar",
          errors: supa.error.message,
          inputs: payload,
        };
      }
    }

    const token = (await cookies()).get("register-token")?.value || "";
    const body = {
      ...restPayload,
      date_of_birth: format(new Date(date_of_birth), "yyyy-MM-dd"),
      profile_picture: path,
    };

    const res = await apiServer({
      method: "POST",
      url: "/api/profile/",
      headers: { Authorization: `Token ${token}` },
      body: JSON.stringify(body),
    });

    if (!res.ok && profile_picture) {
      await supabase().storage.from(bucket).remove([path]);
    }

    return {
      success: true,
      message: `Selamat datang ${restPayload.full_name}!`,
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
