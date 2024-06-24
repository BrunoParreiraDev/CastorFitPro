import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "@radix-ui/react-progress";

const InfoCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Seus Treinos</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
          Administre os treinos dos alunos, disponibilize videoaulas, monitore o desempenho, forneça feedback personalizado, e muito mais
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Gerenciar Treinos</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Esta Semana</CardDescription>
          <CardTitle className="text-3xl">R$ 1.329,00</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +25% desde a ultima semana
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={25} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Este mês</CardDescription>
          <CardTitle className="text-3xl">R$ 5.329,54</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +10% desde o ultimo mês
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default InfoCards;
