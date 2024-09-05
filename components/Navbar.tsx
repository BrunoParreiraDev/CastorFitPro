import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

import { ModeToggle } from "@/components/ModeToggle";
import { getUserData, signOut } from "@/lib/actions/user.actions"; // Importando a função signOut

const Navbar = () => {
  const [user, setUser] = useState<{
    profileImage: string;
    name: string;
  } | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false); // Estado para o processo de logout

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUser(data);
    };

    fetchUserData();
  }, []);

  // Função para lidar com o logout
  const handleSignOut = async () => {
    setIsLoggingOut(true); // Definindo o estado de logout como verdadeiro
    try {
      const { success, error } = await signOut(); // Chamando a função signOut
      if (success) {
        // Redirecionar ou executar outras ações após o logout bem-sucedido
        window.location.href = "/entrar"; // Redireciona para a página de login após o logout
      } else {
        console.error("Erro ao fazer logout:", error);
        alert("Erro ao sair. Tente novamente."); // Pode usar toastr ou outro método de notificação
      }
    } catch (error) {
      console.error("Erro inesperado durante o logout:", error);
      alert("Erro inesperado durante o logout. Tente novamente."); // Pode usar toastr ou outro método de notificação
    } finally {
      setIsLoggingOut(false); // Resetando o estado de logout após a tentativa
    }
  };

  if (!user) {
    return <></>; // Exibe um carregador ou algum outro conteúdo enquanto os dados são carregados
  }

  return (
    <>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Alunos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Treinos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquisar..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage
                src={
                  user.profileImage
                    ? user.profileImage
                    : "users/henrique_castor.jpg"
                }
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Configuração</DropdownMenuItem>
          <DropdownMenuItem>Suporte</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full h-full">
            <Link href="/entrar" passHref className="w-full h-full block">
              Entrar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full h-full">
            <Link href="/cadastrar" passHref className="w-full h-full block">
              Cadastrar
            </Link>
          </DropdownMenuItem>
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="cursor-pointer"
              >
                Sair
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Navbar;
