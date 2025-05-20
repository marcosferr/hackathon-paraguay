"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkingAuth: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  checkingAuth: true,
})

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("adminAuth")
      if (adminAuth) {
        try {
          const { expiresAt } = JSON.parse(adminAuth)
          if (new Date(expiresAt) > new Date()) {
            setIsAuthenticated(true)
          } else {
            // La sesión ha expirado
            localStorage.removeItem("adminAuth")
          }
        } catch (error) {
          console.error("Error al verificar la autenticación:", error)
          localStorage.removeItem("adminAuth")
        }
      }
      setCheckingAuth(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // En una aplicación real, esto sería una llamada a la API
    // Por ahora, usamos credenciales hardcodeadas para demostración
    if (email === "admin@hackathonspain.com" && password === "admin123") {
      // Guardar la sesión con una expiración de 24 horas
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 24)

      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          email,
          expiresAt: expiresAt.toISOString(),
        }),
      )

      setIsAuthenticated(true)
      return true
    } else {
      alert("Credenciales incorrectas")
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, checkingAuth }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
