"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function PublicarHackathonPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})

    // Validación básica
    const errors: Record<string, string> = {}
    if (!startDate) errors.startDate = "La fecha de inicio es requerida"
    if (!endDate) errors.endDate = "La fecha de fin es requerida"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      const formElement = e.target as HTMLFormElement
      const formData = new FormData(formElement)

      // Obtener los datos del formulario
      const hackathonData = {
        name: formData.get("event_name"),
        description: description,
        start_date: startDate?.toISOString().split("T")[0],
        end_date: endDate?.toISOString().split("T")[0],
        location: formData.get("location"),
        venue: formData.get("venue"),
        organizer_name: formData.get("nombre"),
        organizer_email: formData.get("email"),
        status: "submitted",
      }

      // Subir imagen si existe
      const imageFile = (document.getElementById("image") as HTMLInputElement)?.files?.[0]
      if (imageFile) {
        const imageFormData = new FormData()
        imageFormData.append("file", imageFile)

        const imageResponse = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        })

        if (imageResponse.ok) {
          const { url } = await imageResponse.json()
          hackathonData.image_url = url
        }
      }

      // Enviar datos del hackathon
      const response = await fetch("/api/hackathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hackathonData),
      })

      if (response.ok) {
        setIsSuccess(true)
        formElement.reset()
        setStartDate(undefined)
        setEndDate(undefined)
        setDescription("")
        setSelectedFileName(null)
      } else {
        const error = await response.json()
        alert(`Error al enviar el formulario: ${error.message || "Inténtalo de nuevo más tarde"}`)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      alert("Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name)
    } else {
      setSelectedFileName(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Publicar hackathon</h1>
        <p className="text-xl text-gray-600 mb-8">Comparte los detalles de tu hackathon con la comunidad</p>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-2">1. Servicios gratuitos:</h2>
          <p className="text-gray-700">
            Rellena el siguiente formulario y publicamos tu hackathon web sin ningún coste para ti. Sí, lo has leído
            bien, aprovecha ahora la oportunidad de difundir tu evento gratis a todos los visitantes de nuestra página
            web 😊
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">¡Gracias por tu envío!</h2>
            <p className="text-green-600 mb-4">
              Hemos recibido los detalles de tu hackathon. Revisaremos la información y lo publicaremos pronto.
            </p>
            <Button type="button" onClick={() => setIsSuccess(false)} className="bg-green-600 hover:bg-green-700">
              Enviar otro hackathon
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Tus detalles</h2>
              <div className="grid gap-6 mb-8">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <Input id="nombre" name="nombre" type="text" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Nombre del evento</h2>
              <div>
                <Input id="event_name" name="event_name" type="text" placeholder="Nombre del evento" required />
                <p className="text-sm text-gray-500 mt-1">El nombre del evento. Ejemplo: la fiesta de cumpleaños</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Cuándo</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button" // Importante: especificar type="button" para evitar el envío del formulario
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                          formErrors.startDate && "border-red-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                          setStartDate(date)
                          if (date && (!endDate || date > endDate)) {
                            setEndDate(date)
                          }
                        }}
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  {formErrors.startDate && <p className="text-red-500 text-sm mt-1">{formErrors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button" // Importante: especificar type="button" para evitar el envío del formulario
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                          formErrors.endDate && "border-red-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => date < (startDate || new Date())}
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  {formErrors.endDate && <p className="text-red-500 text-sm mt-1">{formErrors.endDate}</p>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Dónde</h2>
              <div className="grid gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <Input id="location" name="location" type="text" placeholder="Ciudad, País" required />
                </div>
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
                    Lugar específico
                  </label>
                  <Input id="venue" name="venue" type="text" placeholder="Nombre del lugar, dirección" required />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Descripción</h2>
              <div className="min-h-[200px]">
                <textarea
                  id="description"
                  name="description"
                  className="w-full h-48 p-2 border rounded-md"
                  placeholder="Describe tu hackathon aquí..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Imagen del evento</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG o JPEG (máx. 5MB)</p>
                </div>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button" // Importante: especificar type="button" para evitar el envío del formulario
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  Seleccionar archivo
                </Button>
                {selectedFileName && (
                  <p className="mt-2 text-sm text-gray-600">Archivo seleccionado: {selectedFileName}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar hackathon"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
