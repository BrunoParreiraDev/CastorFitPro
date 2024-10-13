// types/form.d.ts

import { SubmitHandler } from "react-hook-form";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  profileImage: any;
}

export interface SubmitedUserData {
  onSubmit: SubmitHandler<FormData>;
}

export interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute; // Aceita HTMLInputTypeAttribute ou undefined
  error?: FieldError;
}
