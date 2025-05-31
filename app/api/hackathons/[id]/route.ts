import { type NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET /api/hackathons/[id] - Obtener un hackathon por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { rows } =
      await sql`SELECT * FROM hackathons WHERE id = ${params.id}`;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Hackathon no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ hackathon: rows[0] });
  } catch (error) {
    console.error("Error al obtener hackathon:", error);
    return NextResponse.json(
      { error: "Error al obtener hackathon" },
      { status: 500 }
    );
  }
}

// PATCH /api/hackathons/[id] - Actualizar un hackathon
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Verificar que el hackathon existe
    const { rows: existingRows } =
      await sql`SELECT * FROM hackathons WHERE id = ${params.id}`;

    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: "Hackathon no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el hackathon
    const { rows } = await sql`
      UPDATE hackathons 
      SET status = ${data.status} 
      WHERE id = ${params.id} 
      RETURNING *
    `;

    return NextResponse.json({ hackathon: rows[0] });
  } catch (error) {
    console.error("Error al actualizar hackathon:", error);
    return NextResponse.json(
      { error: "Error al actualizar hackathon" },
      { status: 500 }
    );
  }
}

// DELETE /api/hackathons/[id] - Eliminar un hackathon
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar que el hackathon existe
    const { rows: existingRows } =
      await sql`SELECT * FROM hackathons WHERE id = ${params.id}`;

    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: "Hackathon no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar el hackathon
    await sql`DELETE FROM hackathons WHERE id = ${params.id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar hackathon:", error);
    return NextResponse.json(
      { error: "Error al eliminar hackathon" },
      { status: 500 }
    );
  }
}
