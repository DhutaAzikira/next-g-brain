"use server";

import { nanoid } from "nanoid";
import { format } from "date-fns";

import { handleActionError } from "@/lib/handler-action-error";
import { flattenError } from "@/lib/zod";
import { client } from "@/utils/supabase/client";
import { tryCatch } from "@/utils/try-catch";
import { apiServer } from "@/lib/api-server";

import { ActionState } from "@/types/action.type";
import { updateProfileSchema, UpdateProfileSchemaType } from "../schemas/update-profile.schema";
import { UserType } from "@/types/auth.type";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

type UpdatedUserType = Pick<
  UserType,
  "profile_picture" | "full_name" | "phone_number" | "date_of_birth" | "gender" | "bio"
>;
type UpdateProfileActionType = ActionState<UpdateProfileSchemaType, UpdatedUserType>;

export async function updateProfile(
  state: UpdateProfileActionType,
  formData: FormData,
): Promise<UpdateProfileActionType> {
  try {
    const payload = {
      full_name: formData.get("full_name") as string,
      phone_number: formData.get("phone_number") as string,
      date_of_birth: formData.get("date_of_birth") as string,
      gender: formData.get("gender") as UpdateProfileSchemaType["gender"],
      bio: formData.get("bio") as string,
      profile_picture: formData.get("profile_picture") as File,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    };

    const validateData = await updateProfileSchema.safeParseAsync(payload);

    if (!validateData.success) {
      return {
        success: false,
        message: "Periksa kembali data yang Anda masukkan",
        errors: flattenError(validateData.error).fieldErrors,
        inputs: payload,
      };
    }

    const { profile_picture, date_of_birth, ...rest } = validateData.data;

    const bucket = "user-profiles";
    const placeholder = nanoid(10);
    const path = `public/${placeholder}${profile_picture?.name ? `-${profile_picture.name}` : ""}`;

    if (
      profile_picture?.size &&
      profile_picture?.size > 0 &&
      profile_picture?.type?.startsWith("image/")
    ) {
      const supa = await client.storage.from(bucket).upload(path, profile_picture as File);

      if (supa.error) {
        console.log("supabase error", supa.error);

        return {
          success: false,
          message: "Gagal memperbarui profil",
          errors: supa.error.message,
          inputs: payload,
        };
      }
    }

    const body = {
      ...rest,
      ...((profile_picture?.size || 0) > 0 && { profile_picture: path }),
      date_of_birth: format(new Date(date_of_birth), "yyyy-MM-dd"),
    };

    const [res, err] = await tryCatch(
      apiServer({
        method: "PUT",
        url: "/api/profile/",
        body: JSON.stringify(body),
      }),
    );

    if (err) {
      console.log("error update profile", err);
      return {
        success: false,
        message: "Gagal memperbarui profil",
        errors: err.message,
        inputs: payload,
      };
    }

    if (!res.ok && profile_picture) {
      await client.storage.from(bucket).remove([path]);
    }

    await signIn("credentials", {
      username: payload.username,
      password: payload.password,
      remember: true,
      redirect: false,
    });

    revalidatePath("/dashboard/setting");

    return {
      success: true,
      message: "Berhasil memperbarui profil",
      data: {
        profile_picture: profile_picture?.size && profile_picture?.size > 0 ? path : "",
        full_name: body.full_name,
        phone_number: body.phone_number,
        date_of_birth: body.date_of_birth,
        gender: body.gender,
        bio: body.bio!,
      },
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
