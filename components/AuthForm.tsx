"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { Icons } from "@/components/Icons";


const FormSchema = z.object({
  username: z.string().min(2, {
    message: "O nome de usuário deve ter mais de dois caracteres.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter mais de 6 caracteres.",
  }),
});

const AuthForm = () => {
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    toast({
      title: "Você enviou os seguintes valores:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6 my-5 ">
        <Button variant="outline">
          <Icons.microsoft className="mr-2 h-4 w-4" />
          Microsoft
        </Button>
        <Button variant="outline">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase mt-4 mb-3">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuar com
          </span>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="username"
            label="Acesso"
            placeholder="Ex: Usuario123"
            // description="O acesso utilizado para entrar em sua conta"
            isRequired={true}
            error={errors.username}
          />
          <FormInput
            name="password"
            label="Senha"
            type="password"
            placeholder="Ex: MD3cd8r68"
            // description="A senha utilizada para entrar em sua conta"
            isRequired={true}
            error={errors.password}
          />
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default AuthForm;