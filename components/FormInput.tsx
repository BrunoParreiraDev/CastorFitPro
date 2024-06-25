import { Input } from "@/components/ui/input";
import { FormInputProps } from "@/types";
import React from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  label,
  placeholder,
  description,
  isRequired = false,
  type = "text",
  error,
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-100">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...(isRequired ? { required: true } : {})}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default FormInput;
