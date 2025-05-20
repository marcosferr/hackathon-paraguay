import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AdminAuthProvider } from "@/hooks/use-admin-auth"

const inter = Inter({ subsets: ["latin"] })

// Actualizar el título y la descripción
export const metadata: Metadata = {
  title: "Hackathons Paraguay",
  description: "Plataforma para descubrir y publicar hackathons en Paraguay",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AdminAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
