"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dumbbell, Home, LineChart, Settings, Users2 } from "lucide-react"
import { SkeletonLogo } from "./SkeletonLogo"

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/treinos", icon: Dumbbell, label: "Treinos" },
  { href: "/alunos", icon: Users2, label: "Alunos" },
  { href: "/relatorio", icon: LineChart, label: "Relatório" },
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <Link
          href="/"
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground transition-transform hover:scale-110"
        >
          <div className="relative h-full w-full rounded-full overflow-hidden shadow-sm">
            <Avatar>
              <AvatarImage src="/logo.png" alt="CastorFit Pro logo" />
              <AvatarFallback><SkeletonLogo /></AvatarFallback>
            </Avatar>
          </div>
          <span className="sr-only">CastorFit Pro</span>
        </Link>

        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-secondary md:h-8 md:w-8 ${
                    pathname === item.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/config"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-secondary md:h-8 md:w-8 ${
                  pathname === "/config"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Configurações</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Configurações</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export default Sidebar