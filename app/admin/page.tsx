"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export default function AdminPage() {
  const [hackathons, setHackathons] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isAuthenticated, login, logout, checkingAuth } = useAdminAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchHackathons()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  const fetchHackathons = async () => {
    try {
      const response = await fetch("/api/hackathons?status=submitted")
      if (response.ok) {
        const data = await response.json()
        setHackathons(data.hackathons || [])
      } else {
        console.error("Error al obtener hackathons")
      }
    } catch (error) {
      console.error("Error al obtener hackathons:", error)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`/api/hackathons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      })

      if (response.ok) {
        setHackathons(hackathons.map((h) => (h.id === id ? { ...h, status: "approved" } : h)))
      } else {
        alert("Error al aprobar el hackathon")
      }
    } catch (error) {
      console.error("Error al aprobar hackathon:", error)
    }
  }

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`/api/hackathons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected" }),
      })

      if (response.ok) {
        setHackathons(hackathons.map((h) => (h.id === id ? { ...h, status: "rejected" } : h)))
      } else {
        alert("Error al rechazar el hackathon")
      }
    } catch (error) {
      console.error("Error al rechazar hackathon:", error)
    }
  }

  // Formatear fecha en español
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  if (checkingAuth) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Verificando autenticación...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Acceso Administrador</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Button variant="outline" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Hackathons pendientes de aprobación</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organizador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hackathons.map((hackathon) => (
                <tr key={hackathon.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{hackathon.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(hackathon.start_date)}
                      {hackathon.end_date !== hackathon.start_date && ` - ${formatDate(hackathon.end_date)}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{hackathon.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{hackathon.organizer_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        hackathon.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : hackathon.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {hackathon.status === "approved"
                        ? "Aprobado"
                        : hackathon.status === "rejected"
                          ? "Rechazado"
                          : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link href={`/admin/hackathon/${hackathon.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </Link>
                      {hackathon.status === "submitted" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(hackathon.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(hackathon.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {hackathons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No hay hackathons pendientes de aprobación
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
