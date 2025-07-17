"use client";

import Image from "next/image";
import { Save } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { User } from "next-auth";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { LabelWrapperInput } from "@/components/ui/label";
import { InputPhoneNumber } from "@/components/ui/phone-number";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextAreaCount } from "@/components/ui/text-area-count";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputAvatar } from "@/components/ui/input-avatar";

import { initialActionState } from "@/types/action.type";
import { cn } from "@/utils/cn";
import { getImageUrl } from "@/utils/image-url";

import { updateProfile } from "../../services/update-profile.service";
import { useUpdateEffect } from "@/hooks/use-update-effect";
import { InputPassword } from "@/components/ui/password";

type SettingProfileFormProps = {
  user: User | undefined;
  className?: string;
};

export function SettingProfileForm({ user, className }: SettingProfileFormProps) {
  const [state, action, isPending] = useActionState(updateProfile, initialActionState);
  const [hasFile, setHasFile] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>();

  const errorObj = typeof state.errors === "object" ? state.errors : null;

  useUpdateEffect(() => {
    if (state.success && typeof state.data === "object") {
      toast.success(state.message);
      window.location.reload();
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state.success, state.message, state.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setOpen(true);
    setForm(formData);
  };

  const handleDialogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dialogForm = new FormData(e.currentTarget);

    const payload = {
      ...Object.fromEntries(form!.entries()),
      password: dialogForm.get("password") as string,
    };

    const formData = new FormData();

    formData.append("username", user?.username as string);

    for (const payloadKey in payload) {
      formData.append(payloadKey, payload[payloadKey as keyof typeof payload] as string);
    }

    setOpen(false);
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (!state.success && typeof state.errors === "string") {
      if (state.errors.startsWith("Read more")) {
        toast.error("Password salah", { description: "Pastikan password Anda benar!" });
      } else {
        toast.error("Gagal memperbarui profil", { description: state.errors });
      }
    }

    if (state.success && state.message) {
      toast.success(state.message);
    }
  }, [state.errors, state.message, state.success]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perbarui Profil</DialogTitle>
            <DialogDescription>
              Masukan password untuk memverifikasi perubahan profil Anda.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleDialogSubmit} className="space-y-4">
            <InputPassword name="password" required disabled={isPending} placeholder="Password" />

            <DialogFooter>
              <Button type="submit" className="w-full">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <form onSubmit={handleSubmit} className={cn("grid grid-cols-1 gap-6", className)}>
        <CardHeader className="border-b @3xl/card-header:px-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              {!hasFile && (
                <Avatar className="pointer-events-none absolute z-10 size-20">
                  {user?.image && (
                    <Image
                      src={getImageUrl(user?.image)}
                      alt={user?.name || ""}
                      width={48}
                      height={48}
                      className="absolute size-full object-cover"
                    />
                  )}
                  <AvatarImage
                    src={getImageUrl(user?.image || "")}
                    alt={user?.name || ""}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-purple text-lg font-medium text-white">
                    {user?.name?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
              )}

              <InputAvatar
                name="profile_picture"
                disabled={isPending}
                maxSize={2}
                initialFiles={
                  state.inputs?.profile_picture
                    ? [
                        {
                          id: state.inputs?.profile_picture.name,
                          name: state.inputs?.profile_picture.name,
                          size: state.inputs?.profile_picture.size,
                          type: state.inputs?.profile_picture.type,
                          url: URL.createObjectURL(state.inputs?.profile_picture),
                        },
                      ]
                    : undefined
                }
                onFilesChange={() => {
                  setHasFile(true);
                }}
                className="size-20 shrink-0"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-lg font-semibold md:text-xl">Informasi Profil</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Perbarui informasi profil Anda untuk pengalaman yang lebih personal
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="@container/card-content">
          <div className="grid grid-cols-1 gap-6">
            <LabelWrapperInput
              label="Nama Lengkap"
              htmlFor="full_name"
              errors={errorObj?.full_name}
            >
              <Input
                type="text"
                name="full_name"
                defaultValue={user?.name || state.inputs?.full_name || ""}
                disabled={isPending}
                placeholder="Masukan Nama Lengkap"
                required
              />
            </LabelWrapperInput>

            <LabelWrapperInput label="Email" htmlFor="email">
              <Input
                type="email"
                name="email"
                defaultValue={user?.email || ""}
                placeholder="Masukan Email"
                disabled
                required
              />
            </LabelWrapperInput>

            <LabelWrapperInput
              label="Nomor Telepon"
              htmlFor="phone"
              errors={errorObj?.phone_number}
            >
              <InputPhoneNumber
                name="phone_number"
                placeholder="Nomor Telepon"
                value={
                  user?.phone_number.split(" ").join("") ||
                  state.inputs?.phone_number.split(" ").join("") ||
                  ""
                }
                required
              />
            </LabelWrapperInput>

            <LabelWrapperInput
              label="Tanggal Lahir"
              htmlFor="date_of_birth"
              errors={errorObj?.date_of_birth}
            >
              <DatePicker
                id="date_of_birth"
                placeholder="Tanggal Lahir"
                required
                value={user?.date_of_birth ? new Date(user?.date_of_birth) : undefined}
                disabled={[{ after: new Date() }]}
              />
            </LabelWrapperInput>

            <LabelWrapperInput
              label="Jenis Kelamin"
              htmlFor="gender"
              className="col-span-full"
              errors={errorObj?.gender}
            >
              <Select name="gender" required disabled={isPending} defaultValue={user?.gender || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue defaultValue={state.inputs?.gender} placeholder="Jenis Kelamin" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </LabelWrapperInput>

            <LabelWrapperInput
              label="Biografi"
              htmlFor="bio"
              className="col-span-full"
              errors={errorObj?.bio}
              optional
            >
              <TextAreaCount
                name="bio"
                disabled={isPending}
                initialValue={user?.bio || state.inputs?.bio || ""}
                placeholder="Masukan hal tentang diri Anda"
                maxLength={250}
                rows={4}
              />
            </LabelWrapperInput>

            <div className="col-span-full">
              <Button type="submit" className="bg-gradient-purple hover:opacity-80 has-[>svg]:px-8">
                <Save />
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </CardContent>
      </form>
    </>
  );
}
