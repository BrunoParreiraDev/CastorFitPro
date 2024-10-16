import { AlunoAssiduidade, ObjetivoAluno, ProgressoAluno, ReceitaMensal } from "@/types/summary";

// Busca o número de alunos ativos.
export const getAlunosAtivos = async (): Promise<number> => {
  try {
    // Dados falsos para o número de alunos ativos
    return 45; // Exemplo: 45 alunos ativos
  } catch (error: any) {
    console.error("Erro ao buscar alunos ativos:", error.message);
    return 0;
  }
};

// Calcula a média de frequência de visitas.
export const getMediaFrequencia = async (): Promise<number> => {
  try {
    // Dados falsos para a média de frequência
    return Math.round(Math.random() * 100); // Exemplo: média aleatória de frequência
  } catch (error: any) {
    console.error("Erro ao calcular média de frequência:", error.message);
    return 0;
  }
};

// Busca o número de novos alunos inscritos no mês.
export const getNovosAlunos = async (): Promise<number> => {
  try {
    // Dados falsos para novos alunos
    return Math.floor(Math.random() * 10); // Exemplo: entre 0 e 10 novos alunos
  } catch (error: any) {
    console.error("Erro ao buscar novos alunos:", error.message);
    return 0;
  }
};

// Busca os dados de progresso dos alunos com peso, percentual de gordura, etc.
export const getProgressoAlunos = async (): Promise<ProgressoAluno[]> => {
  try {
    // Dados falsos para o progresso dos alunos
    return Array.from({ length: 30 }, (_, i) => ({
      data: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      peso: Math.round(Math.random() * (100 - 60) + 60), // Peso aleatório entre 60 e 100
      percentualGordura: Math.round(Math.random() * 30), // Percentual aleatório de gordura
    }));
  } catch (error: any) {
    console.error("Erro ao buscar progresso dos alunos:", error.message);
    return [];
  }
};

// Busca a distribuição de tipos de treino entre os alunos.
export const getDistribuicaoTreinos = async (): Promise<
  { name: string; value: number }[]
> => {
  try {
    // Dados falsos para a distribuição de treinos
    return [
      { name: "Cardio", value: Math.floor(Math.random() * 100) },
      { name: "Força", value: Math.floor(Math.random() * 100) },
      { name: "Funcional", value: Math.floor(Math.random() * 100) },
    ];
  } catch (error: any) {
    console.error("Erro ao buscar distribuição de treinos:", error.message);
    return [];
  }
};

// Busca os dados da receita mensal.
export const getReceitaMensal = async (): Promise<ReceitaMensal[]> => {
  try {
    // Dados falsos para a receita mensal
    const meses = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return meses.map((mes) => ({
      mes: mes,
      valor: Math.round(Math.random() * 2000) + 500, // Receita aleatória entre 500 e 2500
    }));
  } catch (error: any) {
    console.error("Erro ao buscar receita mensal:", error.message);
    return [];
  }
};

// Busca o desempenho de um aluno específico com base no ID.
export const getDesempenhoAluno = async (
  alunoId: string
): Promise<ProgressoAluno[]> => {
  try {
    // Dados falsos para o desempenho de um aluno
    return Array.from({ length: 30 }, (_, i) => ({
      data: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      peso: Math.round(Math.random() * (100 - 60) + 60), // Peso aleatório entre 60 e 100
      percentualGordura: Math.round(Math.random() * 30), // Percentual aleatório de gordura
      forcaMuscular: Math.round(Math.random() * 100), // Força muscular aleatória
    }));
  } catch (error: any) {
    console.error("Erro ao buscar desempenho do aluno:", error.message);
    return [];
  }
};

// Busca a frequência de assiduidade de cada aluno.
export const getAssiduidadeAlunos = async (): Promise<AlunoAssiduidade[]> => {
  try {
    // Dados falsos para a assiduidade dos alunos
    return [
      { aluno: "João Silva", frequencia: Math.floor(Math.random() * 100) },
      { aluno: "Maria Santos", frequencia: Math.floor(Math.random() * 100) },
      { aluno: "Pedro Oliveira", frequencia: Math.floor(Math.random() * 100) },
    ];
  } catch (error: any) {
    console.error("Erro ao buscar assiduidade dos alunos:", error.message);
    return [];
  }
};

// Busca os objetivos e progresso dos alunos.
export const getObjetivosAlunos = async (): Promise<ObjetivoAluno[]> => {
  try {
    // Dados falsos para os objetivos dos alunos
    return [
      { aluno: "João Silva", progresso: Math.round(Math.random() * 100) },
      { aluno: "Maria Santos", progresso: Math.round(Math.random() * 100) },
      { aluno: "Pedro Oliveira", progresso: Math.round(Math.random() * 100) },
    ];
  } catch (error: any) {
    console.error("Erro ao buscar objetivos dos alunos:", error.message);
    return [];
  }
};
