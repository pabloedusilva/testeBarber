"use client"

import { useState, useEffect } from "react"
import { User, Construction, Settings } from "lucide-react"
import { BottomNavigation } from "@/components/mobile/bottom-navigation"
import { DesktopSidebar } from "@/components/desktop/desktop-sidebar"
import { useApp } from "@/contexts/app-context"

export default function PerfilPage() {
  const [isMobile, setIsMobile] = useState(false)
  const { userName } = useApp()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background text-foreground w-full overflow-x-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground mb-2">Perfil</h1>
          <p className="text-muted-foreground text-sm">Gerencie suas informações pessoais</p>
        </div>

        {/* Construction Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Página em Construção</h2>
            <p className="text-muted-foreground text-center max-w-sm">
              Estamos desenvolvendo uma área completa para você gerenciar seu perfil e preferências.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm">Em breve você poderá editar seu perfil aqui!</span>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  // Desktop
  return (
    <div className="min-h-screen bg-background text-foreground">
  <DesktopSidebar />

      <div className="ml-64 min-h-screen bg-background">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie suas informações pessoais</p>
        </div>

        {/* Construction Content */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-card rounded-full flex items-center justify-center mx-auto mb-8">
              <Construction className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Página em Construção</h2>
            <p className="text-muted-foreground text-center max-w-md mx-auto mb-6">
              Estamos desenvolvendo uma área completa para você gerenciar seu perfil, preferências e configurações de
              conta.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground">Em breve você poderá personalizar seu perfil aqui!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
