import { LabelWrapperInput } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCharacterLimit } from "@/hooks/use-char-limit";

import { DefaultInputType } from "./default.type";

export function CreateScheduleTextAreaInput({
  name,
  label,
  placeholder,
  defaultValue,
  isPending,
  required,
  className,
  errors,
}: DefaultInputType) {
  const maxLength = 5000;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  return (
    <LabelWrapperInput
      label={label}
      htmlFor={name}
      className={className}
      errors={errors}
      optional={!required}
    >
      <div className="relative" role="group">
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          defaultValue={defaultValue}
          rows={4}
          disabled={isPending}
          required
          onChange={handleChange}
          className="peer field-sizing-content max-h-29.5 min-h-0 resize-none pb-6"
        />
        <p
          className="text-border peer-focus-visible:text-muted-foreground absolute right-0 bottom-0 mr-2 mb-2 text-right font-sans text-xs leading-none font-medium"
          role="status"
          aria-live="polite"
        >
          <span className="tabular-nums">
            {limit - characterCount} / {limit}
          </span>{" "}
          karakter tersisa
        </p>
      </div>
    </LabelWrapperInput>
  );
}
