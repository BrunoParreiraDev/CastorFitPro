import { SubmitHandler } from 'react-hook-form';

export interface FormData {
  email: string;
  password: string;
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
  interface?: string;
  error?: FieldError;
};


declare interface getUserInfoProps {
  userId: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}
