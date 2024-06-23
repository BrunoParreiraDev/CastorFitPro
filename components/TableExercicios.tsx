import React from "react";

// Componente de tabela de exemplo
const TableExercicios = () => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Exercício</th>
          <th className="px-4 py-2">Séries</th>
          <th className="px-4 py-2">Repetições</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Supino</td>
          <td className="border px-4 py-2">3</td>
          <td className="border px-4 py-2">10</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Agachamento</td>
          <td className="border px-4 py-2">4</td>
          <td className="border px-4 py-2">12</td>
        </tr>
        {/* Adicione mais linhas conforme necessário */}
      </tbody>
    </table>
  );
};

export default TableExercicios;