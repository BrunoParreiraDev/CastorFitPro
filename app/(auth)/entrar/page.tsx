import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserData, signIn } from "@/lib/actions/user.actions";
import { FormData } from "@/types";
import { toast } from "@/components/ui/use-toast";

import { redirect } from "next/navigation";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {

  return (
    <Card className="max-w-screen-sm mx-auto mt-5">
      <CardHeader className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b-2">
        <div className="hidden md:block md:col-span-2 mx-auto my-auto mr-1 scale-125">
          <Avatar>
            <AvatarImage src="/logo.png" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-12 md:col-span-10">
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Preencha os campos com suas credenciais para entrar.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  );
};

export default SignIn;
