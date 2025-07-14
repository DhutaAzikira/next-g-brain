"use client";
import { Mic } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { User } from "next-auth";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label, LabelWrapperInput } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { TimePicker } from "@/components/ui/time-picker";

import { cn } from "@/utils/cn";
import { initialActionState } from "@/types/action.type";
import { createInterviewScheduleAction } from "../../services/create-interview.service";
import { mountAnim, scheduleFromVariants } from "@/utils/animation";

import { CreateScheduleTextInput } from "./create-schedule-input/text-input";
import { CreateScheduleSelectInput } from "./create-schedule-input/select-input";
import { CreateScheduleTextAreaInput } from "./create-schedule-input/text-area-input";
import { ISchedule } from "@/types/response.type";

import { industryOptions, interviewOptions, positionOptions } from "@/utils/constant";
import { ScheduleSuccess } from "../schedule-success";
import { ScheduleOverlay } from "../schedule-overlay";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { CreateScheduleFileInput } from "./create-schedule-input/file-input";

type CreateScheduleFormProps = {
  className?: string;
  user: User | undefined;
  scheduleDate: ISchedule[] | null;
  date: string;
};

export function CreateScheduleForm({
  className,
  user,
  scheduleDate,
  date: newDate,
}: CreateScheduleFormProps) {
  const isRender = useRef(false);
  const router = useRouter();

  const [date, setDate] = useState(new Date(newDate));
  const [cv, setCv] = useState<FileWithPreview>({
    file: {
      id: "",
      name: "",
      size: 0,
      type: "",
      url: "",
    },
    id: "",
    preview: "",
  });
  const [state, action, isPending] = useActionState(
    createInterviewScheduleAction,
    initialActionState,
  );

  const errorObj = typeof state.errors === "object" ? state.errors : null;
  const MCard = motion.create(Card);

  useEffect(() => {
    if (!isRender.current) {
      isRender.current = true;
      return;
    }

    if (state.success && state.message) {
      toast.success(state.message);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      const newDate = format(new Date(date?.toISOString() || ""), "yyyy-MM-dd");
      router.push(`/dashboard/interview/create?date=${newDate}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // If cv.file has a valid file object, append it
    if (cv.file && cv.file instanceof File) {
      formData.append("cv", cv.file);
    }

    startTransition(() => {
      action(formData);
    });
  };

  // state.data = {
  //   booking_code: "123456",
  //   date: "2024-09-10",
  //   end_time: "10:00",
  //   posisi: "Frontend Developer",
  //   start_time: "09:00",
  //   jenis_wawancara: "HR",
  //   message: "Berhasil membuat jadwal interview",
  //   status: 200,
  // };

  return (
    <AnimatePresence initial={false}>
      {state.data ? (
        <ScheduleSuccess data={state.data} />
      ) : (
        <MCard
          {...mountAnim(scheduleFromVariants)}
          className={cn("w-full max-w-5xl p-4 shadow-none md:p-8", className)}
        >
          <AnimatePresence mode="wait">{isPending && <ScheduleOverlay />}</AnimatePresence>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input type="hidden" name="user_profile_id" value={user?.id} />

            {/* cv - CV */}
            <CreateScheduleFileInput
              file={cv}
              setFile={setCv}
              errors={errorObj?.cv}
              isPending={isPending}
            />

            {/* posisi - Posisi yang Dilatihkan */}
            <CreateScheduleTextInput
              name="posisi"
              label="Posisi yang Dilatihkan"
              placeholder="Contoh: Frontend Developer"
              defaultValue={state.inputs?.posisi}
              isPending={isPending}
              errors={errorObj?.posisi}
              className="col-span-full"
              required
            />

            {/* industri - Industri Perusahaan */}
            <CreateScheduleSelectInput
              name="industri"
              label="Industri Perusahaan"
              placeholder="Pilih Industri"
              defaultValue={state.inputs?.industri}
              isPending={isPending}
              errors={errorObj?.industri}
              required
              items={industryOptions}
            />

            {/* nama_perusahaan - Nama Perusahaan Target */}
            <CreateScheduleTextInput
              name="nama_perusahaan"
              label="Nama Perusahaan Target"
              placeholder="Contoh: G-Brain Corp"
              defaultValue={state.inputs?.nama_perusahaan}
              isPending={isPending}
              errors={errorObj?.nama_perusahaan}
            />

            {/* tingkatan - Tingkat Jabatan */}
            <CreateScheduleSelectInput
              name="tingkatan"
              label="Tingkat Jabatan"
              placeholder="Pilih Tingkat Jabatan"
              defaultValue={state.inputs?.tingkatan}
              isPending={isPending}
              errors={errorObj?.tingkatan}
              required
              items={positionOptions}
            />

            {/* date - Tanggal Interview */}
            <LabelWrapperInput label="Tanggal Interview" htmlFor="date" errors={errorObj?.date}>
              <DatePicker
                id="date"
                placeholder="Pilih Tanggal"
                required
                value={date}
                disabled={[{ before: new Date() }]}
                onChange={handleDateChange}
              />
            </LabelWrapperInput>

            {/* detail_pekerjaan - Detail Pekerjaan */}
            <CreateScheduleTextAreaInput
              name="detail_pekerjaan"
              label="Detail Pekerjaan"
              placeholder="Masukan Detail Pekerjaan"
              defaultValue={state.inputs?.detail_pekerjaan}
              isPending={isPending}
              errors={errorObj?.detail_pekerjaan}
              className="col-span-full"
              required
            />

            {/* jenis_wawancara - Tipe Interview */}
            <LabelWrapperInput
              label="Tipe Interview"
              className="col-span-full"
              errors={errorObj?.jenis_wawancara}
            >
              <RadioGroup
                name="jenis_wawancara"
                required
                disabled={isPending}
                defaultValue={state.inputs?.jenis_wawancara || "HR"}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {interviewOptions.map((item) => {
                  return (
                    <Label
                      key={item.id}
                      className="border-input has-data-[state=checked]:border-primary/50 flex items-center space-x-4 rounded-md border p-4 transition-all duration-500 outline-none"
                    >
                      <RadioGroupItem id={item.id} aria-describedby={item.id} value={item.value} />
                      <div className="w-full text-sm">
                        <Label className="w-full" htmlFor={item.id}>
                          {item.label}
                        </Label>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </Label>
                  );
                })}
              </RadioGroup>
            </LabelWrapperInput>

            {/* schedule_id - Waktu Interview */}
            <LabelWrapperInput
              label="Waktu Interview"
              htmlFor="schedule_id"
              className="col-span-full"
              errors={errorObj?.schedule_id}
            >
              <TimePicker name="schedule_id" required disabled={isPending} times={scheduleDate} />
            </LabelWrapperInput>

            <div className="col-span-full flex justify-center">
              <Button
                disabled={isPending}
                className="bg-gradient-purple w-full max-w-md hover:opacity-80"
              >
                <Mic />
                Mulai Wawancara
              </Button>
            </div>
          </form>
        </MCard>
      )}
    </AnimatePresence>
  );
}
