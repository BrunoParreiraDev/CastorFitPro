"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import FormInput from "@/components/FormInput";

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

    const { handleSubmit, formState: { errors } } = methods;

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
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormInput
                    name="username"
                    label="Acesso"
                    placeholder="Ex: Usuario#123"
                    description="O acesso utilizado para entrar em sua conta"
                    isRequired={true}
                    error={errors.username}
                />
                <FormInput
                    name="password"
                    label="Senha"
                    type="password"
                    placeholder="Ex: MD3cd8r68"
                    description="A senha utilizada para entrar em sua conta"
                    isRequired={true}
                    error={errors.password}
                />
                <Button type="submit" className="w-full">Enviar</Button>
            </form>
        </FormProvider>
    );
};

export default AuthForm;
