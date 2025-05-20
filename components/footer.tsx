import Link from "next/link"
import { Linkedin, Instagram, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hackathons Paraguay</h3>
            <p className="text-gray-300 mb-4">
              La plataforma para descubrir y publicar los mejores hackathons en Paraguay.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/in/marcos-adrian-ferreira/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/calendario" className="text-gray-300 hover:text-white">
                  Calendario
                </Link>
              </li>
              <li>
                <Link href="/publicar-hackathon" className="text-gray-300 hover:text-white">
                  Publicar hackathon
                </Link>
              </li>
              <li>
                <Link href="/organizar-hackathon" className="text-gray-300 hover:text-white">
                  Organizar hackathon
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <span>ferreiramarcosadrian@gmail.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>+34 600 000 000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hackathons Paraguay. Todos los derechos reservados.</p>
          <p className="mt-2">
            Desarrollado por{" "}
            <Link
              href="https://www.linkedin.com/in/marcos-adrian-ferreira/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Marcos Adrian Ferreira
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
