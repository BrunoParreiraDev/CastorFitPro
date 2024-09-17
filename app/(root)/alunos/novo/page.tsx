import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterUserForm from "@/components/RegisterUserForm";

const AlunosPage = () => {

  return (
    <Card className="w-full mx-auto mt-5">
      <CardHeader className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b-2">
        <div className="hidden md:block md:col-span-2 mx-auto my-auto mr-1 scale-125">
          <Avatar>
            <AvatarImage src="/logo.png" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-12 md:col-span-10">
          <CardTitle>Cadastrar</CardTitle>
          <CardDescription>
            Preencha os campos com suas credenciais para cadastrar um aluno.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <RegisterUserForm />
      </CardContent>
    </Card>
  );
};

export default AlunosPage;
