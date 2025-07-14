import { Input } from "@/components/ui/input";
import { LabelWrapperInput } from "@/components/ui/label";
import { DefaultInputType } from "./default.type";

export function CreateScheduleTextInput({
  name,
  label,
  placeholder,
  defaultValue,
  isPending,
  required,
  className,
  errors,
}: DefaultInputType) {
  return (
    <LabelWrapperInput
      label={label}
      htmlFor={name}
      className={className}
      errors={errors}
      optional={!required}
    >
      <Input
        type="text"
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={isPending}
        required={required}
      />
    </LabelWrapperInput>
  );
}
