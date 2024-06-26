import React from "react";
import InfoCards from "@/components/InfoCards";
import TabelaReceita from "@/components/TabelaReceita";
import { getUserData } from "@/lib/actions/user.actions";

const Home = async () => {
  const user = await getUserData();

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-12">
      <h1 className="text-3xl font-bold mt-1 mb-1 p-1">
        Olá, <span className="text-cyan-500">{user?.firstname}!</span>
      </h1>
      <InfoCards />
      <TabelaReceita />
    </div>
  );
};

export default Home;
