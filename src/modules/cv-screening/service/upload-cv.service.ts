"use server";

import { cookies } from "next/headers";

import { uploadCvSchema, UploadCvSchemaType } from "../schema/upload-cv.schema";

import { ActionState } from "@/types/action.type";
import { handleActionError } from "@/lib/handler-action-error";
import { flattenError } from "@/lib/zod";

type UploadCvActionType = ActionState<UploadCvSchemaType, { full_name: string; position: string, id: number }>;

export async function uploadCvAction(
  state: UploadCvActionType,
  formData: FormData,
): Promise<UploadCvActionType> {
  try {
    const payload = {
      cv: formData.get("cv") as File,
    };

    const validateData = await uploadCvSchema.safeParseAsync(payload);

    if (!validateData.success) {
      return {
        success: false,
        message: "Periksa kembali data yang Anda masukkan",
        errors: flattenError(validateData.error).fieldErrors,
        inputs: payload,
      };
    }

    const token = (await cookies()).get("token");
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/cv-screening/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Token ${token?.value}`,
      },
    });

    const data = (await res.json()) as {
      id: number;
      message: string;
      full_name: string;
      position: string;
    };

    if (!res.ok) {
      return {
        success: false,
        message: "Gagal mengunggah CV",
        errors: data.message,
        inputs: payload,
      };
    }

    return {
      success: true,
      message: "Berhasil mengunggah CV",
      data,
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
