"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { excluirTreino } from "@/lib/actions/train.actions";
import TreinoCard from "@/components/TreinoCard";
import { TreinoData } from "@/types/training";

export default function ListaTreinos() {
  const [treinos, setTreinos] = useState<TreinoData[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteTreino = async (id: string) => {
    const { success, error } = await excluirTreino(id);
    if (success) {
      toast({
        title: "Sucesso",
        description: "Treino excluído com sucesso.",
      });
      setTreinos(treinos.filter(treino => treino.id !== id));
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o Treino.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTreinos([
        {
          id: "1",
          nome: "Treino A",
          diaSemana: "Segunda",
          exercicios: [
            { nome: "Supino", descricao: "3x10", videoUrl: "https://example.com/supino" },
            { nome: "Agachamento", descricao: "3x12", videoUrl: "https://example.com/agachamento" },
          ],
        },
        {
          id: "2",
          nome: "Treino B",
          diaSemana: "Quarta",
          exercicios: [
            { nome: "Remada", descricao: "3x10", videoUrl: "https://example.com/remada" },
            { nome: "Leg Press", descricao: "3x15", videoUrl: "https://example.com/legpress" },
          ],
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const treinosFiltrados = treinos.filter((treino) =>
    treino.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mb-6">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Input
              className="w-3/4"
              placeholder="Pesquisar treinos..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <Button className="w-1/4" asChild>
              <Link className="text-white" href="/treinos/novo">Novo</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="w-full">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
          : treinosFiltrados.map((treino) => (
              <TreinoCard
                key={treino.id}
                treino={treino}
                onDelete={handleDeleteTreino}
              />
            ))}
      </div>
    </div>
  );
}