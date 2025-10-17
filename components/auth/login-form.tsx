"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { LoginCredentials } from "@/types/auth"

interface LoginFormProps {
  onToggleMode: () => void
  onContinueAsGuest: () => void
}

export function LoginForm({ onToggleMode, onContinueAsGuest }: LoginFormProps) {
  const { login, loading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await login(formData)
    } catch (err) {
      // Error is handled by context
    }
  }

  const handleInputChange = (field: keyof LoginCredentials, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-serif text-gray-900 mb-2">Faça seu login</h1>
        <p className="text-gray-600">Acesse sua conta para ver seus agendamentos</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            E-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="sua senha"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm text-gray-600">
              Lembrar de mim
            </Label>
          </div>
          <button type="button" className="text-sm text-primary hover:brightness-110 font-medium">
            Esqueci minha senha
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        {/* Continue as Guest */}
        <Button
          type="button"
          variant="outline"
          onClick={onContinueAsGuest}
          className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
        >
          Continuar sem login
        </Button>

        {/* Register Link */}
        <div className="text-center">
          <span className="text-gray-600">Não tem conta ainda? </span>
          <button type="button" onClick={onToggleMode} className="text-primary hover:brightness-110 font-medium">
            Crie agora
          </button>
        </div>
      </form>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500 mb-2">Para demonstração, use:</p>
        <div className="space-y-1 text-xs text-gray-600">
          <p>
            <strong>Cliente:</strong> joao@email.com / 123456
          </p>
          <p>
            <strong>Admin Barbearia:</strong> carlos@barbeariacentral.com / 123456
          </p>
        </div>
      </div>
    </div>
  )
}
