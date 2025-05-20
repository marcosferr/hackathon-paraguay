import { Mail, MapPin, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Contacto</h1>
      <p className="text-xl text-gray-600 mb-8">
        Estamos aquí para ayudarte con cualquier consulta sobre hackathons
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre
                </label>
                <Input id="nombre" name="nombre" type="text" required />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>

            <div>
              <label
                htmlFor="asunto"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Asunto
              </label>
              <Input id="asunto" name="asunto" type="text" required />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mensaje
              </label>
              <Textarea id="mensaje" name="mensaje" rows={5} required />
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Enviar mensaje
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">ferreiramarcosadrian@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium">Ubicación</h3>
                <p className="text-gray-600">Encarnación, Itapúa</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-3">Síguenos en redes sociales</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://www.linkedin.com/in/marcos-adrian-ferreira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://www.instagram.com/ferreiraadrian/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
