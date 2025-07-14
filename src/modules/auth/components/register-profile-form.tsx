import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";

import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputAvatar } from "@/components/ui/input-avatar";

import { initialActionState } from "@/types/action.type";
import { registerProfile } from "../services/register.service";
import { InputPhoneNumber } from "@/components/ui/phone-number";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { TextAreaCount } from "@/components/ui/text-area-count";

export function RegisterProfileForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(registerProfile, initialActionState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message, { description: "Berhasil mendaftar!" });
      router.push("/login");
    }
  }, [state.message, state.success]);

  return (
    <CardContent>
      <form action={action} className="space-y-6">
        <div className="space-y-4">
          <CardTitle>Lengkapi Profil Anda</CardTitle>
          <CardDescription>
            Lengkapi informasi profil Anda untuk pengalaman yang lebih personal.
          </CardDescription>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row">
          <InputAvatar
            name="profile_picture"
            disabled={isPending}
            maxSize={2}
            className="mx-auto size-24 shrink-0"
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
          />

          <div className="flex w-full flex-col justify-center gap-4">
            <Input
              type="text"
              name="full_name"
              placeholder="Nama Lengkap*"
              autoFocus
              defaultValue={state.inputs?.full_name}
              required
              disabled={isPending}
            />

            <DatePicker
              id="date_of_birth"
              placeholder="Tanggal Lahir*"
              disabled={[{ after: new Date() }]}
              required
              disabledButton={isPending}
            />
          </div>
        </div>

        <Select name="gender" required disabled={isPending} defaultValue={state.inputs?.gender}>
          <SelectTrigger name="gender" className="w-full">
            <SelectValue placeholder="Jenis Kelamin*" defaultValue={state.inputs?.gender} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
            <SelectItem value="Perempuan">Perempuan</SelectItem>
          </SelectContent>
        </Select>

        <InputPhoneNumber
          name="phone_number"
          placeholder="Nomor Telepon*"
          disabled={isPending}
          required
        />

        <TextAreaCount
          name="bio"
          placeholder="Masukan hal tentang diri Anda"
          maxLength={250}
          initialValue={state.inputs?.bio}
          disabled={isPending}
          rows={4}
        />

        <Button type="submit" disabled={isPending} className="h-12 w-full">
          {isPending ? "Mendaftar..." : "Submit"}
        </Button>
      </form>
    </CardContent>
  );
}
