"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Treino } from "@/types"

export default function ListaTreinos() {
  const [treinos, setTreinos] = useState<Treino[]>([])
  const [pesquisa, setPesquisa] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula o carregamento dos treinos
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
      ])
      setIsLoading(false)
    }, 1500)
  }, [])

  const treinosFiltrados = treinos.filter((treino) =>
    treino.nome.toLowerCase().includes(pesquisa.toLowerCase())
  )

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
              <Link href="/treinos/novo">Novo</Link>
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
              <Card key={treino.id} className="w-full">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{treino.nome}</h3>
                  <p className="text-sm text-gray-500 mb-4">{treino.diaSemana}</p>
                  <div className="space-y-2">
                    {treino.exercicios.map((exercicio, index) => (
                      <p key={index} className="text-sm">
                        {exercicio.nome} - {exercicio.descricao}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" asChild>
                      <Link href={`/treinos/${treino.id}`}>Editar</Link>
                    </Button>
                    <Button variant="destructive">Excluir</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  )
}