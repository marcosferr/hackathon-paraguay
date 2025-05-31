"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Eye, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Hackathon {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  organizer_name: string;
  organizer_email: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusFilter, setStatusFilter] = useState("submitted");
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, login, logout, checkingAuth } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchHackathons();
    }
  }, [isAuthenticated, statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const fetchHackathons = async () => {
    try {
      const response = await fetch(`/api/hackathons?status=${statusFilter}`);
      if (response.ok) {
        const data = await response.json();
        setHackathons(data.hackathons || []);
      } else {
        console.error("Error al obtener hackathons");
        toast.error("Error al obtener hackathons");
      }
    } catch (error) {
      console.error("Error al obtener hackathons:", error);
      toast.error("Error al obtener hackathons");
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`/api/hackathons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      });

      if (response.ok) {
        setHackathons(
          hackathons.map((h) =>
            h.id === id ? { ...h, status: "approved" } : h
          )
        );
        toast.success("Hackathon aprobado correctamente");
      } else {
        toast.error("Error al aprobar el hackathon");
      }
    } catch (error) {
      console.error("Error al aprobar hackathon:", error);
      toast.error("Error al aprobar el hackathon");
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`/api/hackathons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (response.ok) {
        setHackathons(
          hackathons.map((h) =>
            h.id === id ? { ...h, status: "rejected" } : h
          )
        );
        toast.success("Hackathon rechazado correctamente");
      } else {
        toast.error("Error al rechazar el hackathon");
      }
    } catch (error) {
      console.error("Error al rechazar hackathon:", error);
      toast.error("Error al rechazar el hackathon");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este hackathon?")) {
      return;
    }

    try {
      const response = await fetch(`/api/hackathons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHackathons(hackathons.filter((h) => h.id !== id));
        toast.success("Hackathon eliminado correctamente");
      } else {
        toast.error("Error al eliminar el hackathon");
      }
    } catch (error) {
      console.error("Error al eliminar hackathon:", error);
      toast.error("Error al eliminar el hackathon");
    }
  };

  const handleReReview = async (id: number) => {
    try {
      const response = await fetch(`/api/hackathons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "submitted" }),
      });

      if (response.ok) {
        setHackathons(
          hackathons.map((h) =>
            h.id === id ? { ...h, status: "submitted" } : h
          )
        );
        toast.success("Hackathon enviado para revisión");
      } else {
        toast.error("Error al enviar el hackathon para revisión");
      }
    } catch (error) {
      console.error("Error al enviar hackathon para revisión:", error);
      toast.error("Error al enviar el hackathon para revisión");
    }
  };

  // Formatear fecha en español
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const filteredHackathons = hackathons.filter(
    (hackathon) =>
      hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.organizer_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      hackathon.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (checkingAuth) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Acceso Administrador
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <div className="flex items-center space-x-4">
          <Link href="/admin/messages">
            <Button variant="outline">Mensajes de Contacto</Button>
          </Link>
          <Button variant="outline" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Gestión de Hackathons</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Pendientes</SelectItem>
                  <SelectItem value="approved">Aprobados</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                  <SelectItem value="all">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organizador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredHackathons.map((hackathon) => (
                <tr key={hackathon.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {hackathon.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(hackathon.start_date)}
                      {hackathon.end_date !== hackathon.start_date &&
                        ` - ${formatDate(hackathon.end_date)}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {hackathon.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {hackathon.organizer_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        hackathon.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : hackathon.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {hackathon.status === "approved"
                        ? "Aprobado"
                        : hackathon.status === "rejected"
                        ? "Rechazado"
                        : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/hackathon/${hackathon.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {hackathon.status === "submitted" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApprove(hackathon.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReject(hackathon.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {hackathon.status === "rejected" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReReview(hackathon.id)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(hackathon.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
