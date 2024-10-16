// types/student.d.ts

export interface AlunoData {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  objetivo: string;
  genero: string;
  dataNascimento: string;
  altura: number;
  peso: number;
}

export interface AlunoCardProps {
  aluno: {
    id: string;
    nome: string;
    telefone: string;
    email: string;
  };
  onDelete: (id: string) => void;
}
