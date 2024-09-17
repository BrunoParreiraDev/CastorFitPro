"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation'



// Dados de exemplo dos alunos
const alunosData = [
  {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    email: "joao@email.com",
  },
  {
    id: 2,
    nome: "Maria Santos",
    telefone: "(11) 91234-5678",
    email: "maria@email.com",
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    telefone: "(11) 99876-5432",
    email: "pedro@email.com",
  },
  {
    id: 4,
    nome: "Ana Rodrigues",
    telefone: "(11) 92345-6789",
    email: "ana@email.com",
  },
];

export default function AlunosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredAlunos = alunosData.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Input
              className="w-2/3"
              placeholder="Pesquisar alunos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="w-1/3"
              onClick={() => router.push("/alunos/novo")}
            >
              Novo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlunos.map((aluno) => (
          <Card key={aluno.id}>
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
                className="w-[49%] bg-yellow-400 hover:bg-yellow-500"
              >
                Editar
              </Button>
              <Button
                variant="outline"
                className="w-[49%] bg-red-500 hover:bg-red-600 text-white"
              >
                Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
