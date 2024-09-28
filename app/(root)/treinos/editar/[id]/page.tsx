"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getTreinoById } from "@/lib/actions/train.actions"
import { TreinoData } from "@/types"
import { toast } from "@/components/ui/use-toast"

export default function EditarTreino() {
const [treino, setTreino] = useState<TreinoData | null>(null)
  const router = useRouter()
  const params = useParams();

  const id = params.id as string;

  useEffect(() => {
    const fetchTreinoData = async () => {
      const { treino, error } = await getTreinoById(id);
      if (treino) {
        setTreino(treino as TreinoData);
      } else {
        toast({
          title: "Erro!",
          description: error || "Não foi possível carregar os dados do Treino.",
          variant: "destructive",
        });
      }
    };

    fetchTreinoData();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para atualizar o treino
    console.log(treino)
    router.push("/treinos")
  }

  const updateTreino = (field: string, value: string) => {
    setTreino((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const updateExercicio = (index: number, field: string, value: string) => {
    setTreino((prev) => {
      if (!prev) return null
      const newExercicios = [...prev.exercicios]
      newExercicios[index] = { ...newExercicios[index], [field]: value }
      return { ...prev, exercicios: newExercicios }
    })
  }

  const addExercicio = () => {
    setTreino((prev) =>
      prev
        ? { ...prev, exercicios: [...prev.exercicios, { nome: "", descricao: "", videoUrl: "" }] }
        : null
    )
  }

  if (!treino) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Editar Treino</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Nome do Treino"
              value={treino.nome}
              onChange={(e) => updateTreino("nome", e.target.value)}
              required
            />
            <Select onValueChange={(value) => updateTreino("diaSemana", value)} value={treino.diaSemana}>
              <SelectTrigger>
                <SelectValue placeholder="Dia da Semana" />
              </SelectTrigger>
              <SelectContent>
                {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map(
                  (dia) => (
                    <SelectItem key={dia} value={dia}>
                      {dia}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            {treino.exercicios.map((exercicio, index) => (
              <div key={index} className="space-y-2">
                <Input
                  placeholder="Nome do Exercício"
                  value={exercicio.nome}
                  onChange={(e) => updateExercicio(index, "nome", e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Descrição"
                  value={exercicio.descricao}
                  onChange={(e) => updateExercicio(index, "descricao", e.target.value)}
                  required
                />
                <Input
                  placeholder="URL do Vídeo"
                  value={exercicio.videoUrl}
                  onChange={(e) => updateExercicio(index, "videoUrl", e.target.value)}
                />
              </div>
            ))}
            <Button type="button" onClick={addExercicio}>
              Adicionar Exercício
            </Button>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/treinos")}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}