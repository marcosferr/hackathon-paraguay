import { CalendarIcon, MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { sql } from "@vercel/postgres"
import { notFound } from "next/navigation"

// Función para formatear fechas en español
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("es-ES", options)
}

export default async function HackathonDetailPage({ params }: { params: { id: string } }) {
  // Obtener hackathon por ID usando @vercel/postgres
  const { rows } = await sql`SELECT * FROM hackathons WHERE id = ${params.id}`
  const hackathon = rows[0]

  if (!hackathon) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/calendario" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al calendario
      </Link>

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
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Descripción</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: hackathon.description }} />
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Añadir al calendario</Button>
            <Link href="/contacto">
              <Button variant="outline">Contactar con organizadores</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
