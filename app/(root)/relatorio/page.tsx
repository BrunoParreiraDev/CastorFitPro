"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  UserPlus,
  BarChart as BarChartIcon,
  Target,
  FileText,
} from "lucide-react";
import {
  getAlunosAtivos,
  getMediaFrequencia,
  getNovosAlunos,
  getObjetivosAlunos,
  getReceitaMensal,
} from "@/lib/actions/summary.actions";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ObjetivoAluno, ReceitaMensal } from "@/types/summary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Relatorio() {
  const [objetivosAlunos, setObjetivosAlunos] = useState<ObjetivoAluno[]>([]);
  const [alunosAtivos, setAlunosAtivos] = useState(0);
  const [novosAlunos, setNovosAlunos] = useState(0);
  const [mediaFrequencia, setMediaFrequencia] = useState(0);
  const [receitaMensal, setReceitaMensal] = useState<ReceitaMensal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setAlunosAtivos(await getAlunosAtivos());
      setMediaFrequencia(await getMediaFrequencia());
      setObjetivosAlunos(await getObjetivosAlunos());
      setNovosAlunos(await getNovosAlunos());
      setReceitaMensal(await getReceitaMensal());
    };
    fetchData();
  }, []);

  // Mapeia os dados de receita mensal
  const receitaMensalData = {
    labels: receitaMensal.map((item) => item.mes) || [],
    datasets: [
      {
        label: "Receita Mensal",
        data: receitaMensal.map((item) => item.valor) || [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Mapeia os dados de objetivos dos alunos
  const objetivosAlunosData = {
    labels: objetivosAlunos.map((obj) => obj.aluno) || [], // Mapeia os nomes dos alunos
    datasets: [
      {
        label: "Progresso",
        data: objetivosAlunos.map((obj) => obj.progresso) || [], // Mapeia os progressos dos alunos
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold mb-8">Relatório de Desempenho</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Alunos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alunosAtivos}</div>
            <p className="text-xs text-muted-foreground">
              Alunos ativos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média de Frequência
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaFrequencia}</div>
            <p className="text-xs text-muted-foreground">
              Visitas por aluno este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Alunos</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{novosAlunos}</div>
            <p className="text-xs text-muted-foreground">
              Alunos que se inscreveram este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ajuste para manter os últimos dois cartões na mesma linha em telas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Receita Mensal</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Bar data={receitaMensalData} options={{ responsive: true }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análise Detalhada</CardTitle>
            <CardDescription>Informações detalhadas por aluno</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="objetivos">
              <TabsList className="mb-4">
                <TabsTrigger value="objetivos">
                  <Target className="h-4 w-4 mr-2" />
                  Objetivos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="objetivos">
                <Card>
                  <CardContent className="pt-6">
                    <Bar
                      data={objetivosAlunosData}
                      options={{ responsive: true }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="text-white">
          <FileText className="h-4 w-4 mr-2" />
          Gerar Relatório Completo
        </Button>
      </div>
    </div>
  );
}
