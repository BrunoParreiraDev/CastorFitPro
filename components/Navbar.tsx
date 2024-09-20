"use client";

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
import { useToast } from "./ui/use-toast";
import { SkeletonNav } from "@/components/SkeletonNav"; // Importando o componente SkeletonNav

const Navbar = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUser(data.user);
      setLoading(false); // Dados carregados
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const { success, error } = await signOut();
      if (success) {
        window.location.href = "/entrar";
      } else {
        toast({
          title: "Erro",
          description: "Erro ao sair. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro inesperado durante o logout:", error);
      toast({
        title: "Erro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      window.location.href = "/entrar";
    } catch (error) {
      console.error("Erro inesperado durante o login:", error);
      toast({
        title: "Erro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      {loading ? (
        <SkeletonNav /> // Exibir SkeletonNav enquanto carrega
      ) : (
        <>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/alunos">Alunos</Link>
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
                    src={user?.photoURL || "/users/default-profile.jpg"}
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {!user ? (
                <DropdownMenuItem onSelect={handleSignIn} disabled={isLoggingIn} className="cursor-pointer">
                  Entrar
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil">Minha Conta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href="/config">Configuração</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/suporte">Suporte</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={handleSignOut}
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
      )}
    </>
  );
};

export default Navbar;
