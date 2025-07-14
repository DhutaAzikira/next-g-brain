"use server";

import { cookies } from "next/headers";
import { format } from "date-fns";

import { ActionState } from "@/types/action.type";
import { flattenError } from "@/lib/zod";
import { handleActionError } from "@/lib/handler-action-error";
import {
  ScheduleInterviewSchemaType,
  scheduleInterviewSchema,
} from "../schemas/schedule-interview.schema";
import { IScheduleResponse } from "@/types/response.type";

type CreateInterviewScheduleActionType = ActionState<
  ScheduleInterviewSchemaType,
  IScheduleResponse
>;

export async function createInterviewScheduleAction(
  state: CreateInterviewScheduleActionType,
  formData: FormData,
): Promise<CreateInterviewScheduleActionType> {
  try {
    const formDataObj = {
      schedule_id: formData.get("schedule_id"),
      posisi: formData.get("posisi") as string,
      industri: formData.get("industri") as string,
      nama_perusahaan: formData.get("nama_perusahaan") as string,
      tingkatan: formData.get("tingkatan") as ScheduleInterviewSchemaType["tingkatan"],
      jenis_wawancara: formData.get(
        "jenis_wawancara",
      ) as ScheduleInterviewSchemaType["jenis_wawancara"],
      detail_pekerjaan: formData.get("detail_pekerjaan") as string,
      date: formData.get("date") as string,
      cv: formData.get("cv") as File,
      package: "1",
    };

    const validateSchema = scheduleInterviewSchema.safeParse(formDataObj);

    if (!validateSchema.success) {
      return {
        success: false,
        message: "Periksa kembali data yang Anda masukkan",
        errors: flattenError(validateSchema.error).fieldErrors,
        inputs: {
          posisi: formDataObj.posisi,
          industri: formDataObj.industri,
          nama_perusahaan: formDataObj.nama_perusahaan,
          tingkatan: formDataObj.tingkatan,
          jenis_wawancara: formDataObj.jenis_wawancara,
          detail_pekerjaan: formDataObj.detail_pekerjaan,
          date: formDataObj.date,
          cv: formDataObj.cv,
          package: formDataObj.package as ScheduleInterviewSchemaType["package"],
          schedule_id: parseInt(formDataObj.schedule_id as string),
        },
      };
    }

    const payload = validateSchema.data;
    const formDataPayload = new FormData();

    for (const key in payload) {
      if (key === "cv") {
        const file = payload[key];
        const blob = new Blob([file], { type: file.type });
        formDataPayload.append(key, blob, file.name);
      } else if (key === "date") {
        const newDate = format(
          new Date(payload[key as keyof typeof payload] as string),
          "yyyy-MM-dd HH:mm:ss",
        );
        formDataPayload.append(key, newDate);
      } else {
        formDataPayload.append(key, payload[key as keyof typeof payload] as string);
      }
    }

    console.log(Object.fromEntries(formDataPayload.entries()));

    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value || "";

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/submit-screener/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formDataPayload,
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();

    return {
      success: true,
      message: "Berhasil membuat jadwal interview",
      data: data as IScheduleResponse,
    };
  } catch (error) {
    const errors = handleActionError(error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message || "Gagal membuat jadwal interview"
          : "Gagal membuat jadwal interview",
      errors,
      inputs: state.inputs,
    };
  }
}
