"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPin, Clock, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAdminAuth } from "@/hooks/use-admin-auth"

// Función para formatear fechas en español
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("es-ES", options)
}

export default function AdminHackathonDetailPage({ params }: { params: { id: string } }) {
  const [hackathon, setHackathon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const { isAuthenticated, checkingAuth } = useAdminAuth()

  useEffect(() => {
    if (!checkingAuth && !isAuthenticated) {
      router.push("/admin")
      return
    }

    const fetchHackathon = async () => {
      try {
        const response = await fetch(`/api/hackathons/${params.id}`)
        if (!response.ok) {
          throw new Error("No se pudo cargar el hackathon")
        }
        const data = await response.json()
        setHackathon(data.hackathon)
      } catch (err) {
        setError("Error al cargar el hackathon. Por favor, inténtalo de nuevo más tarde.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchHackathon()
    }
  }, [params.id, router, isAuthenticated, checkingAuth])

  const handleApprove = async () => {
    await updateHackathonStatus("approved")
  }

  const handleReject = async () => {
    await updateHackathonStatus("rejected")
  }

  const updateHackathonStatus = async (status: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/hackathons/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error(`Error al ${status === "approved" ? "aprobar" : "rechazar"} el hackathon`)
      }

      const data = await response.json()
      setHackathon(data.hackathon)

      // Mostrar mensaje de éxito
      alert(`Hackathon ${status === "approved" ? "aprobado" : "rechazado"} correctamente`)
    } catch (err) {
      console.error(err)
      alert(`Error al ${status === "approved" ? "aprobar" : "rechazar"} el hackathon. Por favor, inténtalo de nuevo.`)
    } finally {
      setIsUpdating(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Verificando autenticación...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirigiendo a /admin
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Cargando detalles del hackathon...</p>
      </div>
    )
  }

  if (error || !hackathon) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="mb-6">{error || "No se pudo cargar el hackathon"}</p>
        <Link href="/admin">
          <Button>Volver al panel de administración</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al panel de administración
        </Link>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              hackathon.status === "approved"
                ? "bg-green-100 text-green-800"
                : hackathon.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {hackathon.status === "approved" ? "Aprobado" : hackathon.status === "rejected" ? "Rechazado" : "Pendiente"}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 md:h-96">
          <Image
            src={hackathon.image_url || "/placeholder.svg?height=400&width=800"}
            alt={hackathon.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{hackathon.name}</h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-4">CUÁNDO</h2>
              <div className="flex items-start space-x-3 mb-4">
                <CalendarIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-gray-700">
                    {formatDate(hackathon.start_date)}
                    {hackathon.end_date !== hackathon.start_date && ` - ${formatDate(hackathon.end_date)}`}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                <p className="text-gray-700">Todo el día</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">DÓNDE</h2>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-gray-700">{hackathon.venue}</p>
                  <p className="text-gray-600">{hackathon.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Descripción</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: hackathon.description }} />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Información del organizador</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Nombre:</p>
                <p className="font-medium">{hackathon.organizer_name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{hackathon.organizer_email}</p>
              </div>
            </div>
          </div>

          {hackathon.status === "submitted" && (
            <div className="flex flex-wrap gap-4 border-t pt-6">
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove} disabled={isUpdating}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprobar hackathon
              </Button>
              <Button variant="destructive" onClick={handleReject} disabled={isUpdating}>
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar hackathon
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
