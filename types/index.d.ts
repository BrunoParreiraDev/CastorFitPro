// TODO: separar interfaces por Categoria em arquivos (categoria).d.ts diferentes

import { SubmitHandler } from 'react-hook-form';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  profileImage: any;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface SubmitedUserData {
  onSubmit: SubmitHandler<FormData>;
}

export interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute; // Atualize para aceitar HTMLInputTypeAttribute ou undefined
  error?: FieldError;
}


declare interface getUserInfoProps {
  userId: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}


interface Exercicio {
  nome: string;
  descricao: string;
  videoUrl: string;
}

interface TreinoData {
  id: string;
  nome: string;
  diaSemana: string;
  exercicios: Exercicio[];
}

interface TreinoCardProps {
  treino: Treino;
  onDelete: (id: string) => void;
}

interface AlunoData {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  altura: number;
  peso: number;
}

interface AlunoCardProps {
  aluno: {
    id: string;
    nome: string;
    telefone: string;
    email: string;
  };
  onDelete: (id: string) => void;
}