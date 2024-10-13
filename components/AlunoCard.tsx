import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AlunoCardProps } from '@/types/student';



const AlunoCard: React.FC<AlunoCardProps> = ({ aluno, onDelete }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/alunos/editar/${aluno.id}`);
  };

  const handleDelete = () => {
    onDelete(aluno.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{aluno.nome}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="my-3">
        <p>
          <strong>Telefone:</strong> {aluno.telefone}
        </p>
        <p>
          <strong>E-mail:</strong> {aluno.email}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between mt-5">
        <Button
          variant="outline"
          className="w-[49%] bg-yellow-500 hover:bg-yellow-600"
          onClick={handleEdit}
        >
          Editar
        </Button>
        <Button
          variant="outline"
          className="w-[49%] bg-red-600 hover:bg-red-700 text-white"
          onClick={handleDelete}
        >
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlunoCard;