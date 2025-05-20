"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-blue-600">Hackathons</span> <span className="text-gray-700">Paraguay</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/calendario" className="text-gray-700 hover:text-blue-600">
              Calendario
            </Link>
            <Link href="/publicar-hackathon" className="text-gray-700 hover:text-blue-600">
              Publicar hackathon
            </Link>
            <Link href="/organizar-hackathon">
              <Button className="bg-orange-500 hover:bg-orange-600">Organizar hackathon</Button>
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/calendario"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Calendario
              </Link>
              <Link
                href="/publicar-hackathon"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Publicar hackathon
              </Link>
              <Link href="/organizar-hackathon" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-orange-500 hover:bg-orange-600 w-full">Organizar hackathon</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
