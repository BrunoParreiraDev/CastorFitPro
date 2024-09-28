"use client";

// TODO - Componenntizar o card

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { registerTreino } from "@/lib/actions/train.actions";
import { toast } from "@/components/ui/use-toast";

export default function NovoTreino() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [setDiaSemana] = useState("");
  const [exercicios, setExercicios] = useState([
    { nome: "", descricao: "", videoUrl: "" },
  ]);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Aqui você pode implementar a lógica para enviar os dados para o servidor
      console.log("Dados do formulário:", data);

      await registerTreino(data);

      toast({
        title: "Sucesso!",
        description: `Treino ${data.name} cadastrado com sucesso!`,
      });
    } catch (error) {
      console.error("Erro ao cadastrar Treino:", error);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao cadastrar o Treino. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addExercicio = () => {
    setExercicios([...exercicios, { nome: "", descricao: "", videoUrl: "" }]);
  };

  const updateExercicio = (index: number, field: string, value: string) => {
    const newExercicios = [...exercicios];
    newExercicios[index] = { ...newExercicios[index], [field]: value };
    setExercicios(newExercicios);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Novo Treino</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Nome do Treino"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <Select onValueChange={() => setDiaSemana} required>
              <SelectTrigger>
                <SelectValue placeholder="Dia da Semana" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Segunda",
                  "Terça",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sábado",
                  "Domingo",
                ].map((dia) => (
                  <SelectItem key={dia} value={dia}>
                    {dia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {exercicios.map((exercicio, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder="Nome do Exercício"
                  value={exercicio.nome}
                  onChange={(e) =>
                    updateExercicio(index, "nome", e.target.value)
                  }
                  required
                />
                <Textarea
                  placeholder="Descrição"
                  value={exercicio.descricao}
                  onChange={(e) =>
                    updateExercicio(index, "descricao", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="URL do Vídeo"
                  value={exercicio.videoUrl}
                  onChange={(e) =>
                    updateExercicio(index, "videoUrl", e.target.value)
                  }
                />
              </div>
            ))}
            <Button type="button" onClick={addExercicio}>
              Adicionar Exercício
            </Button>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/treinos")}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar Treino</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
