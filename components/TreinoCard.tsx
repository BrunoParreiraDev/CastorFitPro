import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreinoData } from "@/types";

interface TreinoCardProps {
  treino: TreinoData;
  onDelete: (id: string) => Promise<void>;
}

const TreinoCard: React.FC<TreinoCardProps> = ({ treino, onDelete }) => {
  return (
    <Card className="w-full">
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
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <Button
              variant="outline"
              asChild
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Link href={`/treinos/editar/${treino.id}`}>Editar</Link>
            </Button>
          </div>
          <div className="col-span-1">
            <Button
              variant="destructive"
              onClick={() => onDelete(treino.id)}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreinoCard;
