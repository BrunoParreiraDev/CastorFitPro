"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { excluirAluno, listAlunos } from "@/lib/actions/student.actions";
import { useRouter } from "next/navigation";
import AlunoCard from "@/components/AlunoCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { AlunoData } from "@/types/student";


export default function AlunosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAlunos = async () => {
      const { alunos, error } = await listAlunos();
      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de alunos.",
          variant: "destructive",
        });
      } else {
        setAlunos(alunos as AlunoData[]);
      }
      setIsLoading(false);
    };

    fetchAlunos();
  }, [toast]);

  const handleDeleteAluno = async (id: string) => {
    const { success, error } = await excluirAluno(id);
    if (success) {
      toast({
        title: "Sucesso",
        description: "Aluno excluído com sucesso.",
      });
      // Atualiza a lista de alunos após a exclusão
      setAlunos(alunos.filter(aluno => aluno.id !== id));
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o aluno.",
        variant: "destructive",
      });
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {filteredAlunos.map((aluno) => (
              <AlunoCard
                key={aluno.id}
                aluno={aluno}
                onDelete={() => handleDeleteAluno(aluno.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
