"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterUserForm from "@/components/RegisterUserForm";
import { useToast } from "@/components/ui/use-toast";
import { registerStudent } from "@/lib/actions/user.actions";

const AlunosPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Aqui você pode implementar a lógica para enviar os dados para o servidor
      console.log("Dados do formulário:", data);
      
      // Simulando uma chamada assíncrona
      await registerStudent(data)

      toast({
        title: "Sucesso!",
        description: `Aluno ${data.name} cadastrado com sucesso!`,
      });
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao cadastrar o aluno. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto mt-5">
      <CardHeader className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b-2">
        <div className="hidden md:block md:col-span-1 mx-auto my-auto mr-1 scale-125">
          <Avatar>
            <AvatarImage src="/logo.png" alt="Logo" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-12 md:col-span-10">
          <CardTitle>Cadastrar</CardTitle>
          <CardDescription>
            Preencha os campos para cadastrar um aluno.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <RegisterUserForm onSubmit={handleSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default AlunosPage;