import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { formatToBRL } from "@/lib/utils";
import { toast } from "./ui/use-toast";

const InfoCards = () => {
  const weekEarns = 1439;
  const weekProgress = 44;

  const monthEarns = 6829.54;
  const monthProgress = 68;

  const handleClickTreinos = async () => {
    
    try {
      window.location.href = "/treinos";
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast({
        title: "Erro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Seus Treinos</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Administre os treinos dos alunos, disponibilize videoaulas, monitore
            o desempenho, forneça feedback personalizado, e muito mais
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleClickTreinos}>Gerenciar Treinos</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Esta Semana</CardDescription>
          <CardTitle className="text-3xl">{formatToBRL(weekEarns)}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={weekProgress}
            aria-label={`${weekProgress} increase`}
          />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            {weekProgress}% desde a ultima semana
          </div>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Este mês</CardDescription>
          <CardTitle className="text-3xl">{ formatToBRL(monthEarns) }</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={monthProgress}
            aria-label={`${monthProgress}% increase`}
          />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            {monthProgress}% desde o ultimo mês
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InfoCards;
