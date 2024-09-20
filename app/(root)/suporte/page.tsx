"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Check, Plus, Minus } from 'lucide-react'; // Ajuste conforme necessário

const chamadosData = [
  { id: 1, title: 'Chamado 1', description: 'Descrição do chamado 1' },
  { id: 2, title: 'Chamado 2', description: 'Descrição do chamado 2' },
  { id: 3, title: 'Chamado 3', description: 'Descrição do chamado 3' },
];

const PageSuporte = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="flex flex-col items-center mt-[50px] w-full h-screen bg-background px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Suporte</CardTitle>
          <CardDescription>Filtros e gerenciamento de chamados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between mb-4">
            <select className="border rounded p-2">
              <option value="">Filtrar por janela</option>
              <option value="janela1">Janela 1</option>
              <option value="janela2">Janela 2</option>
            </select>
            <Button variant="default" className='text-white'>Novo Chamado</Button>
          </div>

          {/* Lista de chamados */}
          <div className="space-y-2">
            {chamadosData.map((chamado) => (
              <div key={chamado.id}>
                <div
                  className="flex justify-between items-center cursor-pointer border-b"
                  onClick={() => toggleDropdown(chamado.id)}
                >
                  <h2 className="text-lg font-semibold">{chamado.title}</h2>
                  <div className="flex items-center space-x-2">
                    <Trash className="h-5 w-5 text-red-500 cursor-pointer" />
                    <Check className="h-5 w-5 text-green-500 cursor-pointer" />
                    {expanded === chamado.id ? (
                      <Minus className="h-5 w-5 text-gray-500 cursor-pointer" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-500 cursor-pointer" />
                    )}
                  </div>
                </div>
                {expanded === chamado.id && (
                  <div className="mt-2 p-4 border">
                    <p>{chamado.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageSuporte;
