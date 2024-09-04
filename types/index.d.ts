import { SubmitHandler } from 'react-hook-form';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
}

export interface AuthData {
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
