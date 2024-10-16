
export interface AlunoData {
  id: string; // Tornando id obrigatório
  nome: string;
  email: string;
  telefone: string;
  endereco?: string;
  objetivo?: string;
  altura?: number;
  genero?: "masculino" | "feminino" | "outro";
  peso?: number;
  dataNascimento: Date;
  dataAtualizacao?: Date;
}


export interface AlunoCardProps {
  aluno: {
    id: string | undefined; // Permite undefined
    nome: string;
    telefone: string;
    email: string;
  };
  onDelete: (id: string) => void;
}
