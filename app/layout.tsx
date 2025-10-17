import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/app-context"
import { AuthProvider } from "@/contexts/auth-context"
import { AuthGuard } from "@/components/auth/auth-guard"

const inter = Inter({ subsets: ["latin"] })
const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: "--font-cinzel"
})

export const metadata: Metadata = {
  title: "BarberShop - Agendamentos",
  description: "Sistema de agendamentos para barbearia",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${cinzel.variable}`}>
        <AuthProvider>
          <AuthGuard>
            <AppProvider>{children}</AppProvider>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
