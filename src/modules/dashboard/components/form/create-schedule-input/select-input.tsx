import { LabelWrapperInput } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DefaultInputType } from "./default.type";

type Items = {
  label: string;
  value: string;
};

export function CreateScheduleSelectInput({
  name,
  label,
  placeholder,
  defaultValue,
  errors,
  required = false,
  items,
  isPending,
}: Omit<DefaultInputType, "defaultValue"> & {
  items: Items[];
  defaultValue: string | undefined;
}) {
  return (
    <LabelWrapperInput label={label} htmlFor={name} errors={errors} optional={!required}>
      <Select
        name={name}
        required={required}
        disabled={isPending}
        defaultValue={defaultValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </LabelWrapperInput>
  );
}
