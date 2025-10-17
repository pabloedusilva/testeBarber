"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Calendar, Scissors, Heart, User, CreditCard, Clock, Settings, Bell, LogOut } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function DesktopSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, isGuest } = useAuth()

  const handleLogout = async () => {
    if (confirm("Deseja sair da sua conta?")) {
      await logout()
    }
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
    { icon: Scissors, label: "Serviços", path: "/servicos" },
    { icon: Clock, label: "Horários", path: "/horarios" },
    { icon: Heart, label: "Favoritos", path: "/favoritos" },
    { icon: CreditCard, label: "Pagamentos", path: "/pagamentos" },
    { icon: User, label: "Perfil", path: "/perfil" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
  ]

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
      {/* Logo/Brand */}
  <div className="p-6 border-b border-sidebar-border flex items-center justify-center h-40">
        <img
          src="/images/image-login.png"
          alt=""
          width={100}
          height={100}
        />
      </div>


      {/* User Profile */}
  <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar || "/images/perfil-padrao.jpg"} alt={user?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {isGuest ? <User className="w-5 h-5" /> : user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{isGuest ? "Visitante" : user?.name}</p>
            <p className="text-muted-foreground text-sm">{isGuest ? "Modo visitante" : "Cliente Premium"}</p>
          </div>
          {!isGuest && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground w-8 h-8"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={pathname === item.path ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${pathname === item.path
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              onClick={() => router.push(item.path)}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Bell className="w-4 h-4" />
          Notificações
        </Button>
      </div>
    </aside>
  )
}
