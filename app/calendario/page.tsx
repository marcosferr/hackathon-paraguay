import { CalendarIcon, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { sql } from "@vercel/postgres"

// Función para formatear fechas en español
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("es-ES", options)
}

// Función para agrupar hackathons por mes
function groupHackathonsByMonth(hackathons: any[]) {
  const grouped: Record<string, any[]> = {}

  hackathons.forEach((hackathon) => {
    const date = new Date(hackathon.start_date)
    const monthYear = `${date.toLocaleString("es-ES", { month: "long" })} ${date.getFullYear()}`

    if (!grouped[monthYear]) {
      grouped[monthYear] = []
    }

    grouped[monthYear].push(hackathon)
  })

  return grouped
}

export default async function CalendarioPage() {
  // Obtener hackathons aprobados de la base de datos usando @vercel/postgres
  const { rows: hackathons } = await sql`SELECT * FROM hackathons WHERE status = 'approved'`
  const groupedHackathons = groupHackathonsByMonth(hackathons)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Calendario de Hackathons</h1>
      <p className="text-xl text-gray-600 mb-8">Descubre los próximos hackathons en Paraguay</p>

      <div className="mb-8">
        <Link href="/publicar-hackathon">
          <Button className="bg-blue-600 hover:bg-blue-700">Publicar tu hackathon</Button>
        </Link>
      </div>

      {Object.entries(groupedHackathons).length > 0 ? (
        Object.entries(groupedHackathons).map(([month, monthHackathons]) => (
          <div key={month} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">{month}</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {monthHackathons.map((hackathon) => (
                <Link href={`/calendario/${hackathon.id}`} key={hackathon.id} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={hackathon.image_url || "/placeholder.svg?height=200&width=400"}
                        alt={hackathon.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>

                      <div className="flex items-start space-x-2 mb-2">
                        <CalendarIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-gray-700">
                            {formatDate(hackathon.start_date)}
                            {hackathon.end_date !== hackathon.start_date && ` - ${formatDate(hackathon.end_date)}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 mb-2">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-gray-700">{hackathon.venue}</p>
                          <p className="text-gray-600">{hackathon.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No hay hackathons programados actualmente.</p>
          <p className="text-gray-600 mb-6">¿Por qué no publicas el tuyo?</p>
          <Link href="/publicar-hackathon">
            <Button className="bg-blue-600 hover:bg-blue-700">Publicar hackathon</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
