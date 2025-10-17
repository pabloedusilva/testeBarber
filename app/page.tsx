"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { UserRole } from "@/types/roles"

export default function HomePage() {
  const router = useRouter()
  const { user, isGuest, loading } = useAuth()

  useEffect(() => {
    // Aguardar o carregamento do auth
    if (loading) return

    // Se não tiver usuário, fica aqui (AuthGuard mostrará o login)
    if (!user) return

    // Se for admin, redirecionar para /admin
    if (!isGuest && user.role === UserRole.BARBER_ADMIN) {
      router.replace("/admin")
      return
    }

    // Se for cliente ou guest, redirecionar para /servicos (página pública)
    router.replace("/servicos")
  }, [user, isGuest, loading, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-foreground">Carregando...</p>
      </div>
    </div>
  )
}
