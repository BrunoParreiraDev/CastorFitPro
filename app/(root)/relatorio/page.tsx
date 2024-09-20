// /pages/PageRelatorio.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PageRelatorio = () => {
  return (
    <div className="flex flex-col items-center mt-[70px] h-screen bg-background px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Relatório</CardTitle>
          <CardDescription>Relatórios de desempenho e progresso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Conteúdo do relatório */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-4/5" />
            <Skeleton className="h-8 w-3/4" />
          </div>

          {/* Botão provisório */}
          <Button className="w-full text-white" variant="default" disabled>
            Ver Detalhes do Relatório
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageRelatorio;
