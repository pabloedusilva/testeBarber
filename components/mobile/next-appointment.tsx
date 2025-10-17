"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Lock, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useApp } from "@/contexts/app-context"
import type { Appointment } from "@/contexts/app-context"

interface NextAppointmentProps {
  appointment?: Appointment
  loading?: boolean
}

export function NextAppointment({ appointment, loading }: NextAppointmentProps) {
  const { isGuest } = useAuth()
  const { updateAppointmentStatus } = useApp()
  const [isCancelling, setIsCancelling] = useState(false)

  if (loading) {
    return (
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-foreground font-medium">Seu próximo horário</h2>
          <span className="text-muted-foreground text-sm">Ver mais</span>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isGuest) {
    return (
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-foreground font-medium">Seu próximo horário</h2>
          <span className="text-muted-foreground text-sm">Ver mais</span>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Lock className="w-12 h-12 text-muted-foreground/70 mx-auto mb-3" />
                <p className="text-muted-foreground mb-2">Faça login para ver seus agendamentos</p>
                <p className="text-muted-foreground/80 text-sm">Entre na sua conta ou crie uma nova</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-foreground font-medium">Seu próximo horário</h2>
          <span className="text-muted-foreground text-sm">Ver mais</span>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-muted-foreground text-center">Nenhum agendamento encontrado</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  return (
    <div className="px-4 mb-8">
      <div className="mb-4">
        <h2 className="text-foreground font-semibold text-lg">Seu próximo horário</h2>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 shadow-lg shadow-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-4">
            {/* Avatar maior e destacado */}
            <Avatar className="w-16 h-16">
              <AvatarImage src={appointment.barber.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                {appointment.barber.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Informações do agendamento */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-foreground font-bold text-lg">{appointment.barber.name}</h3>
                <Badge className="bg-green-600 hover:bg-green-600 text-white">
                  {appointment.status === "scheduled" ? "Agendado" : appointment.status}
                </Badge>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-foreground/80 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium">{formatDate(appointment.date)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-foreground/80 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">{appointment.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Cancelar - apenas para agendamentos com status "scheduled" */}
          {appointment.status === "scheduled" && (
            <button
              onClick={() => {
                setIsCancelling(true)
                updateAppointmentStatus(appointment.id, "cancelled")
                setTimeout(() => setIsCancelling(false), 2000)
              }}
              disabled={isCancelling}
              className="w-full mt-4 py-2 px-4 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              {isCancelling ? "Cancelando..." : "Cancelar agendamento"}
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
