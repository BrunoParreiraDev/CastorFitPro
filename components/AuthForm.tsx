"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { useState } from "react";
import { signIn } from "@/lib/actions/user.actions"; // Importe a função signIn
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para armazenar mensagem de erro
  const { toast } = useToast();
  const router = useRouter();

  // Inicializa o useForm
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  // Função para lidar com a submissão do formulário
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null); // Reseta a mensagem de erro antes de tentar fazer login

    try {
      const { user, error } = await signIn(data);

      if (error) {
        setErrorMessage(error);
      } else {
        toast({
          title: "Sucesso!",
          description: "Bem-vindo(a) de volta " + user?.displayName + "!",
        });

        // Redirecionar ou executar outras ações após o login bem-sucedido
        router.push("/");
      }
    } catch (error: any) {
      setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
      toast({
        title: "Oops!",
        description: "Erro ao autenticar, tente novamente mais tarde.",
      });
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          name="email"
          label="Email"
          placeholder="Ex: pedroalbano@exemplo.com"
          isRequired={true}
        />
        <FormInput
          name="password"
          label="Senha"
          type="password"
          placeholder="Ex: MD3cd8r68"
          isRequired={true}
        />
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        <Button type="submit" className="w-full">
          {isLoading ? "Carregando..." : "Enviar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
