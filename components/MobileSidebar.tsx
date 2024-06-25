import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Home, LineChart, PanelLeft, Users2, Dumbbell } from "lucide-react";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Ativar Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs" >
        <nav className="grid gap-6 text-lg font-medium">
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <div className="relative h-full w-full rounded-full overflow-hidden shadow-sm">
                <Avatar className="hover:scale-125 transition-all">
                  <AvatarImage src="/logo.png" />
                  <AvatarFallback>CastorFit Pro</AvatarFallback>
                </Avatar>
              </div>
            </Link>
            <span className="ml-4 font-bold">CastorFit Pro</span>
          </div>

          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <Dumbbell className="h-5 w-5" />
            Treinos
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <Users2 className="h-5 w-5" />
            Alunos
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <LineChart className="h-5 w-5" />
            Configurações
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
