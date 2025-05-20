import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

// Configurar el cliente de S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "eu-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

// Función para subir un archivo a S3
export async function uploadToS3(file: File): Promise<string> {
  try {
    // Generar un nombre único para el archivo
    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`

    // Convertir el archivo a un buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Configurar los parámetros para la subida
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || "hackathon-spain",
      Key: `uploads/${fileName}`,
      Body: buffer,
      ContentType: file.type,
    }

    // Subir el archivo a S3
    await s3Client.send(new PutObjectCommand(params))

    // Devolver la URL del archivo
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION || "eu-west-1"}.amazonaws.com/${params.Key}`
  } catch (error) {
    console.error("Error al subir el archivo a S3:", error)
    throw error
  }
}
