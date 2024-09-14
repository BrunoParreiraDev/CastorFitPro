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
import { getUserData, signOut } from "@/lib/actions/user.actions";
import { UserInfo } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUser(data.user);
    };

    fetchUserData();
  }, []);

  // Função para lidar com o logout
  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const { success, error } = await signOut();
      if (success) {
        window.location.href = "/entrar"; // Redireciona após logout
      } else {
        console.error("Erro ao fazer logout:", error);
        alert("Erro ao sair. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro inesperado durante o logout:", error);
      alert("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return null; // Pode ser um loader ou outro componente de carregamento
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
                src={user.photoURL || "/users/default_profile.jpg"}
              />
              <AvatarFallback>{user.displayName}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {!user && (
            <DropdownMenuItem>
              <Link href="/entrar">Entrar</Link>
            </DropdownMenuItem>
          )}
          {user && (
            <>
              <DropdownMenuItem>
                <Link href="/perfil">Minha Conta</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configuração</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
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
