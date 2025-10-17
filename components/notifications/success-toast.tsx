"use client"

import { Button } from "@/components/ui/button"
import { Toast } from "@/components/ui/toast"
import { Calendar, MessageCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface SuccessToastProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointmentData?: {
    barberName: string
    serviceName: string
    date: string
    time: string
    clientName: string
    clientPhone: string
  }
}

export function SuccessToast({ open, onOpenChange, appointmentData }: SuccessToastProps) {
  const router = useRouter()

  const handleWhatsAppShare = () => {
    if (!appointmentData) return

    const message = `🎉 *Agendamento Confirmado!*

📅 *Data:* ${new Date(appointmentData.date).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })}
⏰ *Horário:* ${appointmentData.time}
💇‍♂️ *Barbeiro:* ${appointmentData.barberName}
✂️ *Serviço:* ${appointmentData.serviceName}
👤 *Cliente:* ${appointmentData.clientName}

Nos vemos em breve! 💪`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleViewAppointments = () => {
    onOpenChange(false)
    router.push("/agendamentos")
  }

  return (
    <Toast open={open} onOpenChange={onOpenChange}>
      <div className="space-y-4">
        {/* Success Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-foreground font-semibold">Agendamento concluído com sucesso!</h3>
            <p className="text-muted-foreground text-sm">Seu horário foi confirmado</p>
          </div>
        </div>

        {/* Appointment Details */}
        {appointmentData && (
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Barbeiro:</span>
                <span className="text-foreground font-medium">{appointmentData.barberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serviço:</span>
                <span className="text-foreground font-medium">{appointmentData.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data:</span>
                <span className="text-foreground font-medium">
                  {new Date(appointmentData.date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horário:</span>
                <span className="text-foreground font-medium">{appointmentData.time}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button onClick={handleWhatsAppShare} className="w-full bg-green-600 hover:bg-green-700 text-white">
            <MessageCircle className="w-4 h-4 mr-2" />
            Enviar via WhatsApp
          </Button>

          <Button
            onClick={handleViewAppointments}
            variant="outline"
            className="w-full bg-card border-border text-foreground hover:bg-accent"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Veja seu agendamento
          </Button>
        </div>
      </div>
    </Toast>
  )
}
