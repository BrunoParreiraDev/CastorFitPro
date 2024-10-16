export interface ProgressoAluno {
  data: string;
  peso: number;
  percentualGordura: number;
  forcaMuscular?: number; // Opcional, para desempenho do aluno
}

export interface AlunoAssiduidade {
  aluno: string;
  frequencia: number;
}

export interface ReceitaMensal {
  mes: string;
  valor: number;
}

export interface ObjetivoAluno {
  aluno: string;
  progresso: number;
}
