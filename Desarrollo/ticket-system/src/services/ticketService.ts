import { db } from "@/lib/firebase";
import { CreateTicketData, Ticket, TicketResponse } from "@/types/ticket";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const TICKETS_COLLECTION = "tickets";
const RESPONSES_COLLECTION = "responses";
const USE_LOCAL_STORAGE = true; // Cambiar a false cuando tengas Firebase configurado

// Versión localStorage para desarrollo sin Firebase
const getTicketsFromLocalStorage = (): Ticket[] => {
  if (typeof window === "undefined") return [];
  const tickets = localStorage.getItem("tickets");
  return tickets ? JSON.parse(tickets) : [];
};

const saveTicketsToLocalStorage = (tickets: Ticket[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

// Crear un nuevo ticket
export const createTicket = async (
  ticketData: CreateTicketData
): Promise<string> => {
  try {
    if (USE_LOCAL_STORAGE) {
      // Versión localStorage
      const tickets = getTicketsFromLocalStorage();
      const newTicket: Ticket = {
        id: `ticket_${Date.now()}`,
        ...ticketData,
        status: "abierto" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        responses: [],
      };

      tickets.unshift(newTicket);
      saveTicketsToLocalStorage(tickets);

      // Simular respuesta automática después de 2 segundos
      setTimeout(() => {
        generateAutomaticResponseLocal(newTicket.id, ticketData.category);
      }, 2000);

      return newTicket.id;
    } else {
      // Versión Firebase original
      const ticket = {
        ...ticketData,
        status: "abierto" as const,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        responses: [],
      };

      const docRef = await addDoc(collection(db, TICKETS_COLLECTION), ticket);

      setTimeout(() => {
        generateAutomaticResponse(docRef.id, ticketData.category);
      }, 2000);

      return docRef.id;
    }
  } catch (error) {
    console.error("Error creando ticket:", error);
    throw error;
  }
};

// Obtener todos los tickets
export const getTickets = async (): Promise<Ticket[]> => {
  try {
    if (USE_LOCAL_STORAGE) {
      return getTicketsFromLocalStorage();
    } else {
      const q = query(
        collection(db, TICKETS_COLLECTION),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      const tickets: Ticket[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tickets.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Ticket);
      });

      return tickets;
    }
  } catch (error) {
    console.error("Error obteniendo tickets:", error);
    throw error;
  }
};

// Escuchar cambios en tiempo real
export const subscribeToTickets = (callback: (tickets: Ticket[]) => void) => {
  if (USE_LOCAL_STORAGE) {
    // Para localStorage, simular tiempo real con polling
    const interval = setInterval(() => {
      const tickets = getTicketsFromLocalStorage();
      callback(tickets);
    }, 1000);

    // Llamada inicial
    callback(getTicketsFromLocalStorage());

    return () => clearInterval(interval);
  } else {
    const q = query(
      collection(db, TICKETS_COLLECTION),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (querySnapshot) => {
      const tickets: Ticket[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tickets.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Ticket);
      });
      callback(tickets);
    });
  }
};

// Actualizar estado del ticket
export const updateTicketStatus = async (
  ticketId: string,
  status: Ticket["status"]
) => {
  try {
    if (USE_LOCAL_STORAGE) {
      const tickets = getTicketsFromLocalStorage();
      const ticketIndex = tickets.findIndex((t) => t.id === ticketId);
      if (ticketIndex >= 0) {
        tickets[ticketIndex].status = status;
        tickets[ticketIndex].updatedAt = new Date();
        saveTicketsToLocalStorage(tickets);
      }
    } else {
      const ticketRef = doc(db, TICKETS_COLLECTION, ticketId);
      await updateDoc(ticketRef, {
        status,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Error actualizando estado del ticket:", error);
    throw error;
  }
};

// Generar respuesta automática para localStorage
const generateAutomaticResponseLocal = (ticketId: string, category: string) => {
  const automaticResponses: Record<string, string[]> = {
    tecnico: [
      "Hemos recibido tu consulta técnica. Nuestro equipo de soporte técnico la revisará en breve.",
      "Para problemas técnicos, asegúrate de incluir información sobre tu sistema operativo y navegador.",
      "Estamos investigando el problema técnico reportado. Te mantendremos informado.",
    ],
    facturacion: [
      "Tu consulta sobre facturación ha sido recibida. El equipo de finanzas la revisará pronto.",
      "Para consultas de facturación, puedes encontrar más información en tu panel de usuario.",
      "Hemos enviado tu consulta al departamento de facturación correspondiente.",
    ],
    general: [
      "Gracias por contactarnos. Tu consulta general ha sido recibida y será atendida pronto.",
      "Hemos recibido tu mensaje. Un representante se pondrá en contacto contigo brevemente.",
      "Tu consulta ha sido registrada exitosamente en nuestro sistema.",
    ],
    soporte: [
      "Tu solicitud de soporte ha sido recibida. Nuestro equipo la atenderá lo antes posible.",
      "Gracias por contactar a soporte. Estamos revisando tu caso.",
      "Tu ticket de soporte ha sido asignado a un especialista.",
    ],
  };

  const responses = automaticResponses[category] || automaticResponses.general;
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  const tickets = getTicketsFromLocalStorage();
  const ticketIndex = tickets.findIndex((t) => t.id === ticketId);

  if (ticketIndex >= 0) {
    const newResponse: TicketResponse = {
      id: `response_${Date.now()}`,
      ticketId,
      message: randomResponse,
      isAutomatic: true,
      createdAt: new Date(),
      author: "Sistema Automático",
    };

    tickets[ticketIndex].responses.push(newResponse);
    tickets[ticketIndex].status = "en_proceso";
    tickets[ticketIndex].updatedAt = new Date();
    saveTicketsToLocalStorage(tickets);
  }
};

// Generar respuesta automática para Firebase (versión original)
const generateAutomaticResponse = async (
  ticketId: string,
  category: string
) => {
  const automaticResponses: Record<string, string[]> = {
    tecnico: [
      "Hemos recibido tu consulta técnica. Nuestro equipo de soporte técnico la revisará en breve.",
      "Para problemas técnicos, asegúrate de incluir información sobre tu sistema operativo y navegador.",
      "Estamos investigando el problema técnico reportado. Te mantendremos informado.",
    ],
    facturacion: [
      "Tu consulta sobre facturación ha sido recibida. El equipo de finanzas la revisará pronto.",
      "Para consultas de facturación, puedes encontrar más información en tu panel de usuario.",
      "Hemos enviado tu consulta al departamento de facturación correspondiente.",
    ],
    general: [
      "Gracias por contactarnos. Tu consulta general ha sido recibida y será atendida pronto.",
      "Hemos recibido tu mensaje. Un representante se pondrá en contacto contigo brevemente.",
      "Tu consulta ha sido registrada exitosamente en nuestro sistema.",
    ],
    soporte: [
      "Tu solicitud de soporte ha sido recibida. Nuestro equipo la atenderá lo antes posible.",
      "Gracias por contactar a soporte. Estamos revisando tu caso.",
      "Tu ticket de soporte ha sido asignado a un especialista.",
    ],
  };

  const responses = automaticResponses[category] || automaticResponses.general;
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  try {
    const ticketRef = doc(db, TICKETS_COLLECTION, ticketId);
    const ticketDoc = await getDoc(ticketRef);

    if (ticketDoc.exists()) {
      const ticketData = ticketDoc.data();
      const currentResponses = ticketData.responses || [];

      const newResponse: TicketResponse = {
        id: `response_${Date.now()}`,
        ticketId,
        message: randomResponse,
        isAutomatic: true,
        createdAt: new Date(),
        author: "Sistema Automático",
      };

      await updateDoc(ticketRef, {
        responses: [
          ...currentResponses,
          {
            ...newResponse,
            createdAt: Timestamp.now(),
          },
        ],
        status: "en_proceso",
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Error generando respuesta automática:", error);
  }
};
