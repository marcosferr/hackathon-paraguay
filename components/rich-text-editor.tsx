"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Importar dynamic de next/dynamic
import dynamic from "next/dynamic"

// Importar ReactQuill dinámicamente con ssr: false para evitar errores
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")
    // Importar los estilos solo en el cliente
    if (typeof window !== "undefined") {
      await import("react-quill/dist/quill.snow.css")
    }
    return RQ
  },
  {
    ssr: false,
    loading: () => <div className="min-h-[200px] border rounded-md p-2">Cargando editor...</div>,
  },
)

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [editorValue, setEditorValue] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsMounted(true)
    setEditorValue(value)
  }, [value])

  // Configuración de los módulos de Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  }

  // Configuración de los formatos permitidos
  const formats = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "link"]

  // Manejar cambios en el editor
  const handleChange = (content: string) => {
    setEditorValue(content)
    onChange(content)
  }

  // No renderizar el editor hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return <div className="min-h-[200px] border rounded-md p-2">Cargando editor...</div>
  }

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Describe tu hackathon aquí..."
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 200px;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }
      `}</style>
    </div>
  )
}
