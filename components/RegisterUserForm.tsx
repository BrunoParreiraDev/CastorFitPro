"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import Link from "next/link";

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
      dataNascimento: "",
      genero: "",
      altura: "",
      peso: "",
    },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-1 sm:col-span-6">
            <FormInput
              name="nome"
              label="Nome"
              placeholder="Ex: Pedro"
              isRequired={true}
            />
          </div>
          <div className="col-span-1 sm:col-span-6">
            <FormInput
              name="email"
              label="Email"
              placeholder="Ex: pedroalbano@exemplo.com"
              isRequired={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-1 sm:col-span-6">
            <FormInput
              name="telefone"
              label="Telefone"
              placeholder="Ex: (11) 98765-4321"
              isRequired={true}
            />
          </div>
          <div className="col-span-1 sm:col-span-6">
            <FormInput
              name="dataNascimento"
              label="Data de Nascimento"
              placeholder="Ex: 01/01/1990"
              isRequired={true}
              type="date"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-1 sm:col-span-12">
            <FormInput
              name="endereco"
              label="Endereço (*)"
              placeholder="Ex: Rua das Flores, 123"
              isRequired={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-1 sm:col-span-4">
            <FormInput
              name="altura"
              label="Altura (cm) (*)"
              placeholder="Ex: 175"
              isRequired={false}
              type="number"
            />
          </div>
          <div className="col-span-1 sm:col-span-4">
            <FormInput
              name="peso"
              label="Peso (kg) (*)"
              placeholder="Ex: 70"
              isRequired={false}
              type="number"
            />
          </div>
          <div className="col-span-1 sm:col-span-4">
            <FormInput
              name="genero"
              label="Gênero (*)"
              placeholder="Ex: Masculino"
              isRequired={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-1 sm:col-span-6">
            <Link href="/alunos" passHref>
              <Button type="button" className="w-full text-light bg-yellow-500 hover:bg-yellow-600">
                Voltar
              </Button>
            </Link>
          </div>
          <div className="col-span-1 sm:col-span-6">
            <Button type="submit" className="w-full text-light">
              {isLoading ? "Carregando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterUserForm;