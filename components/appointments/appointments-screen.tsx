"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ChevronDown, Star, ArrowLeft, X } from "lucide-react"
import { NextAppointment } from "@/components/mobile/next-appointment"

interface Appointment {
  id: string
  barberName: string
  barberAvatar: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  rating?: number
}

interface AppointmentsScreenProps {
  isMobile?: boolean
  onClose?: () => void
  isFullPage?: boolean
}

export function AppointmentsScreen({ isMobile = false, onClose, isFullPage = false }: AppointmentsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("Período")
  const [selectedStatus, setSelectedStatus] = useState("Situação")
  const [selectedBarber, setSelectedBarber] = useState("Barbeiro")
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  // Não bloquear scroll quando for página completa
  useEffect(() => {
    if (isMobile && !isFullPage) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isMobile, isFullPage])

  // Mock próximo agendamento para o componente NextAppointment
  const nextAppointmentMock = {
    id: "next-1",
    barberId: "1",
    barber: {
      id: "1",
      name: "Jardel",
      avatar: "/images/barbeiro1.jpg",
      rating: 5.0,
      specialty: "Corte e Barba",
      specialties: ["Corte", "Barba"],
      available: true,
    },
    serviceId: "1",
    service: {
      id: "1",
      name: "Corte de Cabelo",
      description: "Corte moderno e estilizado",
      price: 25.0,
      duration: 30,
    },
    date: "2024-05-23",
    time: "10:00",
    status: "scheduled" as const,
    clientName: "Cliente",
    clientPhone: "(00) 00000-0000",
  }

  // Mock data - dados mockados como solicitado
  const [mockAppointments, setMockAppointments] = useState<Appointment[]>([
    {
      id: "1",
      barberName: "Jardel",
      barberAvatar: "/images/barbeiro1.jpg",
      date: "Terça, 24 de Maio",
      time: "10:00",
      status: "scheduled",
    },
    {
      id: "2",
      barberName: "Marcus",
      barberAvatar: "/images/barbeiro2.jpg",
      date: "Terça, 29 de Abril",
      time: "10:00",
      status: "completed",
      rating: 5.0,
    },
    {
      id: "3",
      barberName: "Natan",
      barberAvatar: "/images/barbeiro3.jpg",
      date: "Segunda, 14 de Abril",
      time: "10:00",
      status: "completed",
      rating: 5.0,
    },
  ])

  const handleCancelAppointment = (appointmentId: string) => {
    setCancellingId(appointmentId)
    setTimeout(() => {
      setMockAppointments((prev) =>
        prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: "cancelled" as const } : apt))
      )
      setCancellingId(null)
    }, 500)
  }

  // Agrupar agendamentos por mês
  const groupedAppointments = mockAppointments.reduce(
    (groups, appointment) => {
      const month = appointment.date.includes("Maio") ? "Maio" : "Abril"
      if (!groups[month]) {
        groups[month] = []
      }
      groups[month].push(appointment)
      return groups
    },
    {} as Record<string, Appointment[]>,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
  return "bg-primary hover:bg-primary/90 text-primary-foreground"
      case "completed":
        return "bg-green-600 hover:bg-green-600 text-white"
      case "cancelled":
        return "bg-red-600 hover:bg-red-600 text-white"
      default:
        return "bg-muted hover:bg-accent text-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendado"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  if (isMobile) {
    return (
      <div className={`bg-background text-foreground ${isFullPage ? 'min-h-screen' : 'fixed inset-0 z-50 flex flex-col overflow-hidden'}`}>
        {/* Header com botão voltar */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
        </div>

        {/* Conteúdo */}
        <div className={isFullPage ? '' : 'flex-1 overflow-y-auto'}>
          {/* Próximo Agendamento */}
          <NextAppointment 
            appointment={nextAppointmentMock}
          />

          {/* Filtros */}
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" className="bg-card border-border text-foreground hover:bg-accent">
                {selectedPeriod}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="bg-card border-border text-foreground hover:bg-accent">
                {selectedStatus}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="bg-card border-border text-foreground hover:bg-accent">
                {selectedBarber}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Lista de agendamentos agrupados por mês */}
          <div className="px-4 pb-6">
          {Object.entries(groupedAppointments).map(([month, appointments]) => (
            <div key={month} className="mb-6">
              <h2 className="text-foreground font-medium mb-3">{month}</h2>
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={appointment.barberAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{appointment.barberName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-foreground font-medium">{appointment.barberName}</h3>
                            {appointment.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-foreground text-sm">{appointment.rating}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {getStatusText(appointment.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Botão Cancelar - apenas para agendamentos com status "scheduled" */}
                      {appointment.status === "scheduled" && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          disabled={cancellingId === appointment.id}
                          className="w-full mt-3 py-2 px-4 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                          {cancellingId === appointment.id ? "Cancelando..." : "Cancelar agendamento"}
                        </button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    )
  }

  if (!isMobile && isFullPage) {
    return (
      <div className="flex-1 bg-background text-foreground">
        {/* Header da página */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Agendamentos</h1>
        </div>

        {/* Filtros */}
        <div className="p-6 border-b border-border">
          <div className="flex gap-4">{/* Filtros aqui */}</div>
        </div>

        {/* Conteúdo dos agendamentos */}
        <div className="p-6">{/* Lista de agendamentos */}</div>
      </div>
    )
  }

  // Desktop: Painel de notificação expandido
  return (
    <div className="fixed top-4 right-4 w-96 max-h-[80vh] bg-card border border-border rounded-lg shadow-2xl z-50 animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="text-sm font-semibold text-foreground">📅 Meus Agendamentos</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground h-6 w-6 p-0">
          ✕
        </Button>
      </div>

      {/* Filtros compactos */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-muted border-border text-foreground hover:bg-accent text-xs"
          >
            Período
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-muted border-border text-foreground hover:bg-accent text-xs"
          >
            Status
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Lista de agendamentos scrollável */}
      <div className="overflow-y-auto max-h-96">
        <div className="p-4 space-y-4">
          {Object.entries(groupedAppointments).map(([month, appointments]) => (
            <div key={month}>
              <h4 className="text-white font-medium mb-2 text-sm">{month}</h4>
              <div className="space-y-2">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-muted rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={appointment.barberAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">{appointment.barberName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground text-sm font-medium">{appointment.barberName}</span>
                          {appointment.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-foreground text-xs">{appointment.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{appointment.date}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{appointment.time}</span>
                      <Badge className={`${getStatusColor(appointment.status)} text-xs px-2 py-1`}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
