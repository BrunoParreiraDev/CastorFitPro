"use client";

import React, { useEffect, useState } from "react";
import { getUserData } from "@/lib/actions/user.actions";
import Image from "next/image";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<{
    profileImage: string;
    name: string;
    firstname?: string;
    privileges?: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      console.log(data);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      setUserInfo(data);
    };

    fetchUserData();
  }, []);

  if (!userInfo || !userInfo.user) {
    return <div>Usuário não encontrado</div>;
  }

  // Define valores padrão caso os dados estejam ausentes
  const profileImage = userInfo.profileImage || "/default-profile.jpg"; // caminho padrão para imagem
  const name = userInfo.name || "Usuário Desconhecido";
  const firstname = userInfo.firstname || "Primeiro nome não disponível";
  const privileges = userInfo.privileges || "Privilégios não disponíveis";

  return (
    <div>
      <h1>Informações do Usuário</h1>
      <Image
        width={32}
        height={32}
        src={profileImage}
        alt={name}
      />
      <p>Nome: {name}</p>
      <p>Primeiro Nome: {firstname}</p>
      <p>Privilégios: {privileges}</p>
    </div>
  );
};

export default UserProfile;
