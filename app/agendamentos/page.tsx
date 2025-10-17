"use client"

import { useRouter } from "next/navigation"
import { AppointmentsScreen } from "@/components/appointments/appointments-screen"

export default function AgendamentosPage() {
  const router = useRouter()

  return (
    <AppointmentsScreen
      isMobile={true}
      onClose={() => {
        router.push("/servicos")
      }}
      isFullPage={true}
    />
  )
}
