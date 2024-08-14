"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({
    message: "O campo deve ser um email válido",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter mais de 6 caracteres.",
  }),
});

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsLoading(false);
      if (response.ok) {
        // Handle response if necessary
        const responseData = await response.json();

        toast({
          title: `Seja bem-vindo ${responseData?.name || ""}!`,
          description: <p>Você se autenticou com sucesso.</p>,
        });

        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login com Email",
        description: <p>{(error as Error).message}</p>,
      });
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          onSubmit(data);
        })}
        className="space-y-6"
      >
        <FormInput
          name="email"
          label="Email"
          placeholder="Ex: pedroalbano@exemplo.com"
          isRequired={true}
          error={errors.email}
        />
        <FormInput
          name="password"
          label="Senha"
          type="password"
          placeholder="Ex: MD3cd8r68"
          isRequired={true}
          error={errors.password}
        />
        <Button type="submit" className="w-full">
          {isLoading ? "Carregando..." : "Enviar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
