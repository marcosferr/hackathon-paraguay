import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Users, Trophy, Clock, CheckCircle } from "lucide-react"

export default function OrganizarHackathonPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Organiza tu propio Hackathon</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ofrecemos servicios profesionales para ayudarte a organizar un hackathon exitoso para tu empresa u
          organización.
        </p>
      </div>

      <div className="bg-blue-50 rounded-xl p-8 md:p-12 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">¡Próximamente!</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Estamos desarrollando un servicio completo para ayudarte a organizar hackathons de principio a fin. Déjanos
          tus datos y te informaremos cuando esté disponible.
        </p>
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
          Recibir información
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">¿Por qué organizar un hackathon?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Fomenta la innovación y la creatividad en tu organización</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Encuentra soluciones a problemas reales de tu negocio</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Identifica talento y potenciales colaboradores</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Mejora la imagen de tu marca y posiciónate como innovador</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Crea una comunidad en torno a tu producto o servicio</span>
            </li>
          </ul>
        </div>
        <div className="relative h-64 md:h-96">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Organizar un hackathon"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros servicios incluirán</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Planificación</h3>
            <p className="text-gray-600">Definición de objetivos, temática, formato y cronograma del evento.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Participantes</h3>
            <p className="text-gray-600">Captación y gestión de participantes, mentores y jurado.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Ejecución</h3>
            <p className="text-gray-600">Coordinación y gestión del evento durante su desarrollo.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Seguimiento</h3>
            <p className="text-gray-600">Evaluación de resultados y seguimiento post-evento.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">¿Interesado en organizar un hackathon?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Contacta con nosotros para recibir más información sobre nuestros servicios de organización de hackathons.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contacto">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contactar
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Recibir información
          </Button>
        </div>
      </div>
    </div>
  )
}
