export type ActionError<T> = string |  {
  [K in keyof T]?: string[];
};

export type ActionState<T, K = string> = {
  success: boolean;
  message: string;
  data?: K | null;
  errors?: ActionError<T>;
  inputs?: T;
};

export const initialActionState = {
  success: false,
  message: "",
  data: null,
};
