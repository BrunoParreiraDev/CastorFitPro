"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Home,
  LineChart,
  PanelLeft,
  Users2,
  Dumbbell,
  Settings,
} from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/treinos", icon: Dumbbell, label: "Treinos" },
  { href: "/alunos", icon: Users2, label: "Alunos" },
  { href: "/relatorio", icon: LineChart, label: "Relatório" },
]

const MobileSidebar = () => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Ativar Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col h-full">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-primary p-1 text-primary-foreground"
            >
              <Avatar className="h-8 w-8 transition-transform hover:scale-110">
                <AvatarImage src="/logo.png" alt="CastorFit Pro logo" />
                <AvatarFallback>CF</AvatarFallback>
              </Avatar>
            </Link>
            <span className="ml-4 text-lg font-bold">CastorFit Pro</span>
          </div>

          <div className="space-y-4 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-2.5 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-6">
            <Link
              href="/config"
              className={`flex items-center gap-4 px-2.5 py-2 rounded-md transition-colors ${
                pathname === "/config"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Settings className="h-5 w-5" />
              Configurações
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar