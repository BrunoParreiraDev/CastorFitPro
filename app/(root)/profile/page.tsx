import { getUserData } from "@/lib/actions/user.actions";
import Image from "next/image";

const UserProfile = async () => {
  // Obtenha a sessão do usuário
  const userInfo = await getUserData();
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  console.log(userInfo);
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");


  if (!userInfo) {
    return <div>Usuário não encontrado</div>;
  }

  return (
    <div>
      <h1>Informações do Usuário</h1>
      <Image
        width={32}
        height={32}
        src={userInfo.profileImage!}
        alt={userInfo.name!}
      />
      <p>Nome: {userInfo.name!}</p>
      <p>Primeiro Nome: {userInfo.firstname!}</p>
      <p>Privilégios: {userInfo.privileges!}</p>
    </div>
  );
};

export default UserProfile;
