import React from "react";
import InfoCards from "@/components/InfoCards";
import TabelaReceita from "@/components/TabelaReceita";

const Home = () => {
  const name = "Henrique Castor";
  return (
    <div>
      <h1 className="text-3xl font-bold mt-1 mb-5 p-1">
        Olá, <span className="text-cyan-500">{name}!</span>
      </h1>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <InfoCards />
        <TabelaReceita />
      </div>
    </div>
  );
};

export default Home;
