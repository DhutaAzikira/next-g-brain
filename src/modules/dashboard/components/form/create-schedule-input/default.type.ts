export type DefaultInputType = {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue: string | number | readonly string[] | undefined;
  isPending: boolean;
  required?: boolean;
  errors: string[] | undefined;
  className?: string;
};
