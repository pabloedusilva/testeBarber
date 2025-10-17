"use client"

import { Home, Calendar, Heart, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface BottomNavigationProps {
  showOnDesktop?: boolean
}

export function BottomNavigation({ showOnDesktop = false }: BottomNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border ${showOnDesktop ? "" : "md:hidden"}`}>
      <div className="flex items-center justify-around py-3 px-4 max-w-xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="group relative flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {pathname === "/" && (
            <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full" />
          )}
          <Home
            className={`w-6 h-6 transition-all duration-300 ${
              pathname === "/"
                ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
            strokeWidth={pathname === "/" ? 2.5 : 2}
          />
          <span
            className={`text-[10px] font-medium transition-all duration-300 ${
              pathname === "/" ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            Início
          </span>
        </button>

        <button
          onClick={() => router.push("/agendamentos")}
          className="group relative flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {pathname === "/agendamentos" && (
            <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full" />
          )}
          <Calendar
            className={`w-6 h-6 transition-all duration-300 ${
              pathname === "/agendamentos"
                ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
            strokeWidth={pathname === "/agendamentos" ? 2.5 : 2}
          />
          <span
            className={`text-[10px] font-medium transition-all duration-300 ${
              pathname === "/agendamentos"
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            Agenda
          </span>
        </button>

        <button
          onClick={() => router.push("/favoritos")}
          className="group relative flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {pathname === "/favoritos" && (
            <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full" />
          )}
          <Heart
            className={`w-6 h-6 transition-all duration-300 ${
              pathname === "/favoritos"
                ? "text-primary fill-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
            strokeWidth={pathname === "/favoritos" ? 2.5 : 2}
          />
          <span
            className={`text-[10px] font-medium transition-all duration-300 ${
              pathname === "/favoritos"
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            Favoritos
          </span>
        </button>

        <button
          onClick={() => router.push("/perfil")}
          className="group relative flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {pathname === "/perfil" && (
            <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full" />
          )}
          <User
            className={`w-6 h-6 transition-all duration-300 ${
              pathname === "/perfil"
                ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
            strokeWidth={pathname === "/perfil" ? 2.5 : 2}
          />
          <span
            className={`text-[10px] font-medium transition-all duration-300 ${
              pathname === "/perfil"
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            Perfil
          </span>
        </button>
      </div>
    </div>
  )
}
