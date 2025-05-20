import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, PenSquare, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Hackathons Paraguay</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre, participa y organiza los mejores hackathons en Paraguay
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calendario">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Ver Calendario
              </Button>
            </Link>
            <Link href="/publicar-hackathon">
              <Button size="lg" variant="outline">
                Publicar Hackathon
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is a Hackathon Section */}
      <section className="py-12 md:py-16 bg-gray-50 rounded-xl my-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">¿Qué es un Hackathon?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Un <strong>hackathon</strong> es un evento de innovación donde programadores, diseñadores y otros
              profesionales colaboran intensivamente durante un período corto de tiempo para crear soluciones
              tecnológicas a problemas específicos.
            </p>
            <p className="text-lg mb-6">
              Estos eventos fomentan la creatividad, el trabajo en equipo y el aprendizaje acelerado, permitiendo a los
              participantes desarrollar prototipos funcionales en cuestión de horas o días.
            </p>
            <p className="text-lg">
              Los hackathons son una excelente oportunidad para networking, aprendizaje y para mostrar habilidades
              técnicas en un ambiente colaborativo y desafiante.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">¿Por qué participar?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Networking</h3>
            <p className="text-gray-600">Conecta con profesionales, mentores y empresas del sector tecnológico.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
              <PenSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Aprendizaje</h3>
            <p className="text-gray-600">
              Desarrolla nuevas habilidades y conocimientos en un entorno práctico e intensivo.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Oportunidades</h3>
            <p className="text-gray-600">Muestra tu talento y accede a oportunidades laborales y de emprendimiento.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para participar?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Explora los próximos hackathons o publica el tuyo propio en nuestra plataforma.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calendario">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Ver Calendario
            </Button>
          </Link>
          <Link href="/publicar-hackathon">
            <Button size="lg" variant="outline">
              Publicar Hackathon
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
