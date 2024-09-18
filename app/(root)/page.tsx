"use client";

import React, { useEffect, useState } from "react";
import InfoCards from "@/components/InfoCards";
import TabelaReceita from "@/components/TabelaReceita";
import { getUserData } from "@/lib/actions/user.actions"; // Certifique-se de que o caminho esteja correto
import { UserInfo } from "firebase/auth";

const HomePage = () => {
  const [user, setUser] = useState<UserInfo | null>(null); // Estado é do tipo User | null

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUser(data.user); // Atualiza o estado com o usuário retornado
    };

    fetchData();
  }, []);

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-12">
      <h1 className="text-3xl font-bold mt-1 mb-1 p-1">
        Olá,{" "}
        <span className="text-cyan-500">
          {user ? user.displayName || "Usuário" : "Visitante"}
        </span>
        !
      </h1>
      <InfoCards />
      <TabelaReceita />
    </div>
  );
};

export default HomePage;
