"use client";

import { FormProvider } from "react-hook-form"; // Certifique-se de importar o FormProvider
import { useLoginValidation } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { useState } from "react";
import { signIn } from "@/lib/actions/user.actions";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const methods = useLoginValidation();
  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { user, error } = await signIn(data);

      if (error) {
        setErrorMessage("O e-mail ou senha estão incorretos. Tente novamente.");
        console.log(error);
      } else {
        toast({
          title: "Sucesso!",
          description: "Bem-vindo(a) de volta " + user?.displayName + "!",
        });
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
          error={errors.email?.message} // Exibe o erro do campo email
        />
        <FormInput
          name="password"
          label="Senha"
          type="password"
          placeholder="Ex: MD3cd8r68"
          isRequired={true}
          error={errors.password?.message} // Exibe o erro do campo password
        />
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        <Button type="submit" className="w-full text-white">
          {isLoading ? "Carregando..." : "Enviar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
