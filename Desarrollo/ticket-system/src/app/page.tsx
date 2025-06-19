"use client";

import TicketForm from "@/components/TicketForm";
import TicketList from "@/components/TicketList";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTicketCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab("list");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Tickets de Soporte
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crea tickets de soporte y recibe respuestas automáticas
            instantáneas. Nuestro sistema inteligente te ayudará a resolver tus
            consultas rápidamente.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-md p-1 max-w-md">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-3 px-6 text-sm font-medium rounded-md transition-colors ${
                activeTab === "create"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              ✍️ Crear Ticket
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`flex-1 py-3 px-6 text-sm font-medium rounded-md transition-colors ${
                activeTab === "list"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              📋 Ver Tickets
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="pb-12">
          {activeTab === "create" ? (
            <div className="space-y-8">
              <TicketForm onTicketCreated={handleTicketCreated} />

              {/* Features Section */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                  ¿Por qué usar nuestro sistema?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl mb-4">⚡</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Respuestas Automáticas
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Recibe respuestas inmediatas basadas en la categoría de tu
                      consulta
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl mb-4">🔄</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Seguimiento en Tiempo Real
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Mantente al día con el estado de tus tickets
                      automáticamente
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl mb-4">📊</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Gestión Organizada
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Categorías y prioridades para una atención más eficiente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <TicketList key={refreshTrigger} />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t pt-8">
          <p>Sistema de Tickets - Prueba Técnica Full Stack Developer</p>
          <p className="mt-2">
            Desarrollado con Next.js, TypeScript, Tailwind CSS y Firebase
          </p>
        </footer>
      </div>
    </main>
  );
}
