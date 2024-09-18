"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";

interface RegisterUserFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const RegisterUserForm: React.FC<RegisterUserFormProps> = ({ onSubmit, isLoading }) => {
  const methods = useForm({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      endereco: "",
    },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          name="nome"
          label="Nome"
          placeholder="Ex: Pedro"
          isRequired={true}
        />
        <FormInput
          name="email"
          label="Email"
          placeholder="Ex: pedroalbano@exemplo.com"
          isRequired={true}
        />
        <FormInput
          name="telefone"
          label="Telefone"
          placeholder="Ex: (11) 98765-4321"
          isRequired={true}
        />
        <FormInput
          name="endereco"
          label="Endereço"
          placeholder="Ex: Rua das Flores, 123"
          isRequired={false}
        />
        <Button type="submit" className="w-full">
          {isLoading ? "Carregando..." : "Enviar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterUserForm;