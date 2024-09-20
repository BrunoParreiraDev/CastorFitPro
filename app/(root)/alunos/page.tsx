"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { listStudents } from "@/lib/actions/user.actions";
import { useRouter } from 'next/navigation'
import AlunoCard from "@/components/AlunoCard";

interface Aluno {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}

export default function AlunosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAlunos = async () => {
      const { alunos, error } = await listStudents();
      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de alunos.",
          variant: "destructive",
        });
      } else {
        setAlunos(alunos as Aluno[]);
      }
      setIsLoading(false);
    };

    fetchAlunos();
  }, [toast]);

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Input
              className="w-2/3 contrast-theme"
              placeholder="Pesquisar alunos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="w-1/3 text-white"
              onClick={() => router.push("/alunos/novo")}
            >
              Novo
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlunos.map((aluno) => (
            <AlunoCard key={aluno.id} aluno={aluno} onDelete={() => alert('em desenvolvimento')} />
          ))}
        </div>
      )}
    </div>
  );
}