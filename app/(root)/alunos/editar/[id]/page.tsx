"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { updateStudent, getStudentById } from "@/lib/actions/user.actions";
import { useParams } from "next/navigation";
import EditUserForm from "@/components/EditUserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from "lucide-react";

interface StudentData {
  id: string;
  nome: string;
  // Add other student properties here
}

const AlunosEditPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const { toast } = useToast();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchStudentData = async () => {
      const { student, error } = await getStudentById(id);
      if (student) {
        setStudentData(student as StudentData);
      } else {
        toast({
          title: "Erro!",
          description: error || "Não foi possível carregar os dados do aluno.",
          variant: "destructive",
        });
      }
    };

    fetchStudentData();
  }, [id, toast]);

  const handleSubmit = async (data: StudentData) => {
    setIsLoading(true);
    try {
      const result = await updateStudent({
        ...data,
        id,
        email: "",
        telefone: "",
      });

      if (result.success) {
        toast({
          title: "Sucesso!",
          description: `Aluno ${data.nome} atualizado com sucesso!`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao atualizar o aluno. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full mx-auto mt-5">
        <CardHeader className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b-2">
          <div className="hidden md:block md:col-span-1 mx-auto my-auto mr-1 scale-125">
            <Avatar>
              <AvatarImage src="/logo.png" alt="Logo" />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
          </div>
          <div className="col-span-12 md:col-span-10">
            <CardTitle>Editar Aluno</CardTitle>
            <CardDescription>
              Preencha os campos para editar um aluno.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {studentData && (
            <EditUserForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              initialData={studentData}
            />
          )}
        </CardContent>
      </Card>

      <Alert className="mt-4">
        <CircleAlert className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Campos com &quot;*&quot; são opcionais.
        </AlertDescription>
      </Alert>
    </>
  );
};

export default AlunosEditPage;
