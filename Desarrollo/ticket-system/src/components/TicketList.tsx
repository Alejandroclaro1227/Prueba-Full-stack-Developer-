"use client";

import {
  subscribeToTickets,
  updateTicketStatus,
} from "@/services/ticketService";
import { Ticket } from "@/types/ticket";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToTickets((ticketData) => {
      setTickets(ticketData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: Ticket["status"]) => {
    const colors = {
      abierto: "bg-red-100 text-red-800",
      en_proceso: "bg-yellow-100 text-yellow-800",
      resuelto: "bg-green-100 text-green-800",
      cerrado: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Ticket["priority"]) => {
    const colors = {
      baja: "bg-blue-100 text-blue-800",
      media: "bg-yellow-100 text-yellow-800",
      alta: "bg-orange-100 text-orange-800",
      critica: "bg-red-100 text-red-800",
    };
    return colors[priority];
  };

  const handleStatusChange = async (
    ticketId: string,
    newStatus: Ticket["status"]
  ) => {
    try {
      await updateTicketStatus(ticketId, newStatus);
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Historial de Tickets
      </h2>

      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-500 text-lg">
            No hay tickets registrados
          </div>
          <div className="text-gray-400 text-sm mt-2">
            Crea tu primer ticket usando el formulario de arriba
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {ticket.subject}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.replace("_", " ").toUpperCase()}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      Prioridad: {ticket.priority.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {ticket.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end">
                  <div className="text-sm text-gray-500 mb-2">
                    Creado:{" "}
                    {format(ticket.createdAt, "dd MMM yyyy, HH:mm", {
                      locale: es,
                    })}
                  </div>
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(
                        ticket.id,
                        e.target.value as Ticket["status"]
                      )
                    }
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="abierto">Abierto</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="resuelto">Resuelto</option>
                    <option value="cerrado">Cerrado</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Cliente:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {ticket.customerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Email:{" "}
                    </span>
                    <span className="text-sm text-gray-900">
                      {ticket.customerEmail}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">{ticket.description}</p>
                </div>

                {ticket.responses && ticket.responses.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Respuestas:
                    </h4>
                    <div className="space-y-3">
                      {ticket.responses.map((response) => (
                        <div
                          key={response.id}
                          className={`p-3 rounded-lg ${
                            response.isAutomatic
                              ? "bg-blue-50 border-l-4 border-blue-400"
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              {response.author}
                              {response.isAutomatic && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  Automático
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-gray-500">
                              {format(
                                response.createdAt,
                                "dd MMM yyyy, HH:mm",
                                { locale: es }
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            {response.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
