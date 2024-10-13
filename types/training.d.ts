// types/training.d.ts

export interface Exercicio {
  nome: string;
  descricao: string;
  videoUrl: string;
}

export interface TreinoData {
  id: string;
  nome: string;
  diaSemana: string;
  exercicios: Exercicio[];
}

export interface TreinoCardProps {
  treino: TreinoData;
  onDelete: (id: string) => void;
}
