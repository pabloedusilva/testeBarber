"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Calendar, Clock, User, Phone, Check } from "lucide-react"
import { useApp, type Barber } from "@/contexts/app-context"
import { SuccessToast } from "@/components/notifications/success-toast"
import Image from "next/image"

interface BookingFlowProps {
  isOpen: boolean
  onClose: () => void
  selectedBarber?: Barber
}

type Step = "barber" | "service" | "datetime" | "contact" | "confirmation"

export function BookingFlow({ isOpen, onClose, selectedBarber }: BookingFlowProps) {
  const { barbers, services, createAppointment, getAvailableSlots, userName, userPhone, setUserInfo } = useApp()

  const [currentStep, setCurrentStep] = useState<Step>(selectedBarber ? "service" : "barber")
  const [selectedBarberId, setSelectedBarberId] = useState(selectedBarber?.id || "")
  const [selectedServiceId, setSelectedServiceId] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [clientName, setClientName] = useState(userName)
  const [clientPhone, setClientPhone] = useState(userPhone)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [appointmentData, setAppointmentData] = useState<any>(null)

  if (!isOpen && !showSuccessToast) return null

  const selectedBarberData = barbers.find((b) => b.id === selectedBarberId)
  const selectedServiceData = services.find((s) => s.id === selectedServiceId)

  const handleNext = () => {
    if (currentStep === "barber" && selectedBarberId) {
      setCurrentStep("service")
    } else if (currentStep === "service" && selectedServiceId) {
      setCurrentStep("datetime")
    } else if (currentStep === "datetime" && selectedDate && selectedTime) {
      setCurrentStep("contact")
    } else if (currentStep === "contact" && clientName && clientPhone) {
      setCurrentStep("confirmation")
    }
  }

  const handleConfirm = () => {
    if (selectedBarberId && selectedServiceId && selectedDate && selectedTime && clientName && clientPhone) {
      createAppointment({
        barberId: selectedBarberId,
        serviceId: selectedServiceId,
        date: selectedDate,
        time: selectedTime,
        status: "scheduled",
        clientName,
        clientPhone,
      })

      setUserInfo(clientName, clientPhone)

      // Preparar dados para a notificação
      const appointmentInfo = {
        barberName: selectedBarberData?.name || "",
        serviceName: selectedServiceData?.name || "",
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientPhone,
      }

      setAppointmentData(appointmentInfo)

      // Fechar o modal de agendamento PRIMEIRO
      onClose()

      // Mostrar notificação DEPOIS
      setTimeout(() => {
        setShowSuccessToast(true)
      }, 300)

      // Reset form
      setCurrentStep(selectedBarber ? "service" : "barber")
      setSelectedBarberId(selectedBarber?.id || "")
      setSelectedServiceId("")
      setSelectedDate("")
      setSelectedTime("")
    }
  }

  const getNextDays = (count: number) => {
    const days = []
    for (let i = 0; i < count; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push({
        date: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      })
    }
    return days
  }

  return (
    <>
      {/* Booking Flow Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:bg-black/50 md:flex md:items-center md:justify-center md:p-4">
          <div className="bg-card md:border md:border-border md:rounded-lg w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 md:p-6 border-b border-border sticky top-0 bg-card z-10">
              <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-foreground text-xl md:text-2xl font-bold">Novo Agendamento</h1>
                <p className="text-muted-foreground text-sm">
                  {currentStep === "barber" && "Escolha um barbeiro"}
                  {currentStep === "service" && "Escolha um serviço"}
                  {currentStep === "datetime" && "Escolha data e horário"}
                  {currentStep === "contact" && "Seus dados"}
                  {currentStep === "confirmation" && "Confirmar agendamento"}
                </p>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Step 1: Select Barber */}
              {currentStep === "barber" && (
                <div className="space-y-3">
                  {barbers.map((barber) => (
                    <Card
                      key={barber.id}
                      className={`cursor-pointer transition-colors ${
                        selectedBarberId === barber.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-card border-border hover:bg-accent"
                      }`}
                      onClick={() => setSelectedBarberId(barber.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={barber.avatar || "/placeholder.svg"}
                            alt={barber.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-foreground font-medium">{barber.name}</h3>
                            <p className="text-muted-foreground text-sm">⭐ {barber.rating}</p>
                          </div>
                          {selectedBarberId === barber.id && <Check className="w-5 h-5 text-primary" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Step 2: Select Service */}
              {currentStep === "service" && (
                <div className="space-y-3">
                  {services.map((service) => {
                    // Mapear imagens para cada tipo de serviço
                    const getServiceImage = (serviceName: string) => {
                      const name = serviceName.toLowerCase()
                      if (name.includes('corte') && name.includes('barba')) {
                        return 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop'
                      } else if (name.includes('corte')) {
                        return 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&h=200&fit=crop'
                      } else if (name.includes('barba')) {
                        return 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop'
                      } else if (name.includes('bigode')) {
                        return 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200&h=200&fit=crop'
                      } else if (name.includes('sobrancelha')) {
                        return 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop'
                      }
                      return 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop'
                    }

                    return (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-all overflow-hidden ${
                          selectedServiceId === service.id
                            ? "bg-primary border-primary ring-2 ring-primary"
                            : "bg-card border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedServiceId(service.id)}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-stretch">
                            {/* Imagem do serviço - quadrado perfeito */}
                            <div className="w-28 h-full min-h-[112px] relative flex-shrink-0 overflow-hidden bg-muted">
                              <Image
                                src={getServiceImage(service.name)}
                                alt={service.name}
                                fill
                                sizes="112px"
                                className="object-cover"
                                style={{ objectPosition: 'center' }}
                              />
                              {selectedServiceId === service.id && (
                                <div className="absolute inset-0 bg-primary/40" />
                              )}
                            </div>
                            
                            {/* Informações do serviço */}
                            <div className="flex-1 p-4 flex items-center">
                              <div className="flex-1">
                                <h3 className={`font-semibold mb-1 ${
                                  selectedServiceId === service.id 
                                    ? "text-primary-foreground" 
                                    : "text-foreground"
                                }`}>
                                  {service.name}
                                </h3>
                                <p className={`text-sm mb-2 ${
                                  selectedServiceId === service.id 
                                    ? "text-primary-foreground/80" 
                                    : "text-muted-foreground"
                                }`}>
                                  {service.description}
                                </p>
                                <div className="flex items-center gap-3">
                                  <span className={`text-sm font-bold ${
                                    selectedServiceId === service.id 
                                      ? "text-primary-foreground" 
                                      : "text-green-500"
                                  }`}>
                                    R$ {service.price.toFixed(2)}
                                  </span>
                                  <span className={`text-sm ${
                                    selectedServiceId === service.id 
                                      ? "text-primary-foreground/80" 
                                      : "text-muted-foreground"
                                  }`}>
                                    • {service.duration}min
                                  </span>
                                </div>
                              </div>

                              {/* Check icon */}
                              {selectedServiceId === service.id && (
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center ml-3">
                                  <Check className="w-4 h-4 text-primary" />
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* Step 3: Select Date & Time */}
              {currentStep === "datetime" && (
                <div className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-foreground mb-2 block">Escolha a data</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {getNextDays(9).map((day) => (
                        <Button
                          key={day.date}
                          variant={selectedDate === day.date ? "default" : "outline"}
                          className={`text-xs p-2 h-auto ${
                            selectedDate === day.date
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border-border text-foreground hover:bg-accent"
                          }`}
                          onClick={() => setSelectedDate(day.date)}
                        >
                          {day.display}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <Label className="text-foreground mb-2 block">Escolha o horário</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {getAvailableSlots(selectedBarberId, selectedDate).map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            disabled={!slot.available}
                            className={`text-xs p-2 h-auto ${
                              selectedTime === slot.time
                                ? "bg-primary text-primary-foreground"
                                : slot.available
                                  ? "bg-card border-border text-foreground hover:bg-accent"
                                  : "bg-card border-border text-muted-foreground cursor-not-allowed"
                            }`}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Contact Info */}
              {currentStep === "contact" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="bg-card border-border text-foreground mt-1"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="bg-card border-border text-foreground mt-1"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === "confirmation" && (
                <div className="space-y-4">
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <h3 className="text-foreground font-bold mb-3">Resumo do Agendamento</h3>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Barbeiro:</span>
                          <span className="text-foreground font-medium">{selectedBarberData?.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Serviço:</span>
                          <span className="text-foreground font-medium">{selectedServiceData?.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Data:</span>
                          <span className="text-foreground font-medium">
                            {new Date(selectedDate).toLocaleDateString("pt-BR", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Horário:</span>
                          <span className="text-foreground font-medium">{selectedTime}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Cliente:</span>
                          <span className="text-foreground font-medium">{clientName}</span>
                        </div>

                        <div className="border-t border-border pt-2 mt-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total:</span>
                            <span className="text-green-400 font-bold text-lg">
                              R$ {selectedServiceData?.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 sticky bottom-0 bg-card pt-4 pb-2 border-t border-border -mx-4 md:-mx-6 px-4 md:px-6">
                {currentStep !== "barber" && currentStep !== "confirmation" && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      if (currentStep === "service") setCurrentStep(selectedBarber ? "service" : "barber")
                      else if (currentStep === "datetime") setCurrentStep("service")
                      else if (currentStep === "contact") setCurrentStep("datetime")
                    }}
                    className="flex-1 bg-card border-border text-foreground hover:bg-accent"
                  >
                    Voltar
                  </Button>
                )}

                <Button
                  size="lg"
                  onClick={currentStep === "confirmation" ? handleConfirm : handleNext}
                  disabled={
                    (currentStep === "barber" && !selectedBarberId) ||
                    (currentStep === "service" && !selectedServiceId) ||
                    (currentStep === "datetime" && (!selectedDate || !selectedTime)) ||
                    (currentStep === "contact" && (!clientName || !clientPhone))
                  }
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {currentStep === "confirmation" ? "Confirmar Agendamento" : "Continuar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast - Renderizado independentemente */}
      <SuccessToast open={showSuccessToast} onOpenChange={setShowSuccessToast} appointmentData={appointmentData} />
    </>
  )
}
