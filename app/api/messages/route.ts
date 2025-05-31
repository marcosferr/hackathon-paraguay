import { NextResponse } from "next/server";
import { getAll } from "@/lib/db";

export async function GET() {
  try {
    const messages = await getAll("messages", "ORDER BY created_at DESC");
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Error al obtener los mensajes" },
      { status: 500 }
    );
  }
}
