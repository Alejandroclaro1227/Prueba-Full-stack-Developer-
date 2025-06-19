export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: "abierto" | "en_proceso" | "resuelto" | "cerrado";
  priority: "baja" | "media" | "alta" | "critica";
  category: "tecnico" | "facturacion" | "general" | "soporte";
  createdAt: Date;
  updatedAt: Date;
  customerEmail: string;
  customerName: string;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  message: string;
  isAutomatic: boolean;
  createdAt: Date;
  author: string;
}

export interface CreateTicketData {
  subject: string;
  description: string;
  priority: Ticket["priority"];
  category: Ticket["category"];
  customerEmail: string;
  customerName: string;
}
