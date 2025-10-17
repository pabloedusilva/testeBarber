"use client"

import { useState, useEffect } from "react"
import { Heart, Construction } from "lucide-react"
import { BottomNavigation } from "@/components/mobile/bottom-navigation"
import { DesktopSidebar } from "@/components/desktop/desktop-sidebar"
import { useApp } from "@/contexts/app-context"

export default function FavoritosPage() {
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Favoritos</h1>
          <p className="text-muted-foreground text-sm">Seus serviços e barbeiros favoritos</p>
        </div>

        {/* Construction Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Página em Construção</h2>
            <p className="text-muted-foreground text-center max-w-sm">
              Estamos trabalhando para trazer uma experiência incrível para você gerenciar seus favoritos.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-muted-foreground text-sm">Em breve você poderá salvar seus favoritos aqui!</span>
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
          <h1 className="text-2xl font-bold text-foreground">Favoritos</h1>
          <p className="text-muted-foreground text-sm mt-1">Seus serviços e barbeiros favoritos</p>
        </div>

        {/* Construction Content */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-card rounded-full flex items-center justify-center mx-auto mb-8">
              <Construction className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Página em Construção</h2>
            <p className="text-muted-foreground text-center max-w-md mx-auto mb-6">
              Estamos trabalhando para trazer uma experiência incrível para você gerenciar seus serviços e barbeiros
              favoritos.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-muted-foreground">Em breve você poderá salvar seus favoritos aqui!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
