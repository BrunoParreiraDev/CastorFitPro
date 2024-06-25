export type FormInputProps = {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
  type?: string;
  error?: FieldError;
};

export type SubmitedUserData = {
  username: string;
  password: string;
};
