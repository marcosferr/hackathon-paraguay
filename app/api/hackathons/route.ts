import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

// GET /api/hackathons - Obtener todos los hackathons aprobados
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || "approved"

    const { rows } = await sql`SELECT * FROM hackathons WHERE status = ${status}`

    return NextResponse.json({ hackathons: rows })
  } catch (error) {
    console.error("Error al obtener hackathons:", error)
    return NextResponse.json({ error: "Error al obtener hackathons" }, { status: 500 })
  }
}

// POST /api/hackathons - Crear un nuevo hackathon
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validar datos requeridos
    const requiredFields = ["name", "start_date", "end_date", "location", "venue", "organizer_name", "organizer_email"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `El campo ${field} es requerido` }, { status: 400 })
      }
    }

    // Establecer estado inicial como 'submitted'
    const status = "submitted"

    // Insertar en la base de datos
    const { rows } = await sql`
      INSERT INTO hackathons (
        name, 
        description, 
        start_date, 
        end_date, 
        location, 
        venue, 
        organizer_name, 
        organizer_email, 
        image_url, 
        status
      ) VALUES (
        ${data.name}, 
        ${data.description || ""}, 
        ${data.start_date}, 
        ${data.end_date}, 
        ${data.location}, 
        ${data.venue}, 
        ${data.organizer_name}, 
        ${data.organizer_email}, 
        ${data.image_url || null}, 
        ${status}
      ) RETURNING *
    `

    return NextResponse.json({ hackathon: rows[0] }, { status: 201 })
  } catch (error) {
    console.error("Error al crear hackathon:", error)
    return NextResponse.json({ error: "Error al crear hackathon" }, { status: 500 })
  }
}
