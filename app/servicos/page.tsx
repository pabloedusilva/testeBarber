"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Scissors, User, Phone, List } from "lucide-react"
import { BarberSelection } from "@/components/booking/barber-selection"
import Image from "next/image"

export default function ServicosPage() {
  const router = useRouter()
  const [showBarberSelection, setShowBarberSelection] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [userName, setUserName] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")

  // Mock schedule data
  const schedule = {
    weekdays: { open: "8h", close: "19h" },
    saturday: { open: "8h", close: "17h" },
    isOpen: true,
  }

  // Função para formatar data
  const getFormattedDate = () => {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    
    const now = new Date()
    const dayName = days[now.getDay()]
    const day = now.getDate()
    const month = months[now.getMonth()]
    
    return `${dayName}, ${day} de ${month}`
  }

  // Verificar se tem dados salvos no localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("guestUserName")
    const savedPhone = localStorage.getItem("guestUserPhone")
    
    if (savedName && savedPhone) {
      setUserName(savedName)
      setUserPhone(savedPhone)
    } else {
      setShowLoginModal(true)
    }
  }, [])

  const handleSaveUserInfo = () => {
    if (formName.trim() && formPhone.trim()) {
      localStorage.setItem("guestUserName", formName)
      localStorage.setItem("guestUserPhone", formPhone)
      setUserName(formName)
      setUserPhone(formPhone)
      setShowLoginModal(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Banner com Logo sobreposta */}
        <div className="relative mb-20">
          {/* Banner de anúncio */}
          <div 
            className="w-full h-48 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://private-user-images.githubusercontent.com/196930114/502338330-748554eb-f728-4f29-a2c7-2e8d7abe7290.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjA2NjMxNTAsIm5iZiI6MTc2MDY2Mjg1MCwicGF0aCI6Ii8xOTY5MzAxMTQvNTAyMzM4MzMwLTc0ODU1NGViLWY3MjgtNGYyOS1hMmM3LTJlOGQ3YWJlNzI5MC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAxN1QwMTAwNTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kZDFmMDRhNDBhMzg0NDA5OTg5NGIzZmE4M2I1NzAxNmY2N2UwZWZiZmUzZjdmZjk4MmVlMjk1MmU0NWM2MGUxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.ojJ3W5fLFSM6wZTh5AgvEAHZ2SUNUlQ8ym8sjDhLAO0)'
            }}
          />
          
          {/* Logo centralizada sobreposta - metade em cima, metade embaixo */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
            <div 
              className="w-32 h-32 rounded-full bg-white border-4 border-white flex items-center justify-center shadow-2xl bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwGqj7Zik41tlrMQ4KJjfzRd0IqSY4-bFQpQ&s)'
              }}
            />
          </div>
        </div>

        {/* Nome do Estabelecimento */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-wider" style={{ fontFamily: "var(--font-cinzel), serif" }}>
            PABLO DO CORTE
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-primary"></div>
            <Scissors className="w-4 h-4 text-primary" />
            <div className="h-px w-12 bg-primary"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          {/* Saudação */}
          <div className="mb-6 px-4">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Olá, {userName || "Visitante"} 👋
            </h1>
            <p className="text-muted-foreground text-sm">
              {getFormattedDate()}
            </p>
          </div>

          {/* Horários */}
          <div className="px-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground font-medium">Horários</h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${schedule.isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className={`text-sm ${schedule.isOpen ? "text-green-500" : "text-red-500"}`}>
                  {schedule.isOpen ? "Aberto" : "Fechado"}
                </span>
              </div>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Segunda à Sexta</p>
                    <p className="text-foreground text-sm">
                      {schedule.weekdays.open} às {schedule.weekdays.close}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Sábado</p>
                    <p className="text-foreground text-sm">
                      {schedule.saturday.open} às {schedule.saturday.close}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Card - Agendar */}
          <div className="px-4">
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Pronto para agendar?
                  </h3>
                  <p className="text-muted-foreground">
                    Escolha seu barbeiro preferido e o melhor horário para você
                  </p>
                </div>
                
                <Button
                  size="lg"
                  onClick={() => setShowBarberSelection(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto w-full"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Horário
                </Button>

                <button
                  onClick={() => router.push("/agendamentos")}
                  className="mt-4 w-full py-3 border border-muted-foreground/30 rounded-lg text-foreground hover:border-foreground text-sm font-medium transition-all flex items-center justify-center gap-2 bg-transparent"
                >
                  <List className="w-4 h-4" />
                  Ver agendamentos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Login */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Bem-vindo! 👋</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Para continuar, precisamos de algumas informações
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Nome Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Telefone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveUserInfo}
              disabled={!formName.trim() || !formPhone.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Flow */}
      <BarberSelection
        isOpen={showBarberSelection}
        onClose={() => setShowBarberSelection(false)}
        onSelectBarber={(barber) => {
          console.log("Barbeiro selecionado:", barber)
          setShowBarberSelection(false)
        }}
      />
    </>
  )
}
