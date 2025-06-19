# Sistema de Tickets de Soporte Automático

Una aplicación fullstack desarrollada con Next.js, TypeScript, Tailwind CSS y Firebase que simula un sistema de respuestas automáticas a tickets de soporte.

## 🌟 Características

- **Frontend moderno** con Next.js 14 y TypeScript
- **Base de datos en tiempo real** con Firebase Firestore
- **Respuestas automáticas** inteligentes basadas en categorías
- **Interfaz responsiva** con Tailwind CSS
- **Actualizaciones en tiempo real** sin necesidad de refrescar
- **Gestión de estados** de tickets
- **Categorización y priorización** de tickets

## 🚀 Funcionalidades

### ✍️ Crear Tickets

- Formulario intuitivo para crear nuevos tickets
- Campos: nombre, email, asunto, descripción, categoría y prioridad
- Validación en tiempo real
- Mensajes de confirmación

### 🤖 Respuestas Automáticas

- Respuestas automáticas basadas en la categoría del ticket:
  - **Técnico**: Respuestas relacionadas con problemas técnicos
  - **Facturación**: Respuestas sobre consultas de facturación
  - **General**: Respuestas generales de atención al cliente
  - **Soporte**: Respuestas específicas de soporte

### 📋 Gestión de Tickets

- Lista de todos los tickets en tiempo real
- Filtros por estado (abierto, en proceso, resuelto, cerrado)
- Visualización de respuestas automáticas
- Actualización de estados en tiempo real

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14, React, TypeScript
- **Estilos**: Tailwind CSS
- **Base de datos**: Firebase Firestore
- **Fechas**: date-fns
- **Iconos**: Heroicons, Lucide React

## 📦 Instalación

1. **Clona el repositorio**
   \`\`\`bash
   git clone <repository-url>
   cd ticket-system
   \`\`\`

2. **Instala las dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configura Firebase**

   ### Paso 1: Crear proyecto en Firebase

   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Habilita Firestore Database
   - Configura las reglas de seguridad (para desarrollo):

   \`\`\`javascript
   rules_version = '2';
   service cloud.firestore {
   match /databases/{database}/documents {
   match /{document=\*\*} {
   allow read, write: if true; // Solo para desarrollo
   }
   }
   }
   \`\`\`

   ### Paso 2: Obtener configuración

   - Ve a Configuración del proyecto > General
   - En "Tus aplicaciones", agrega una aplicación web
   - Copia la configuración de Firebase

   ### Paso 3: Actualizar configuración

   - Abre \`src/lib/firebase.ts\`
   - Reemplaza la configuración demo con tus credenciales reales:

   \`\`\`typescript
   const firebaseConfig = {
   apiKey: "tu-api-key",
   authDomain: "tu-proyecto.firebaseapp.com",
   projectId: "tu-proyecto-id",
   storageBucket: "tu-proyecto.appspot.com",
   messagingSenderId: "123456789",
   appId: "tu-app-id"
   };
   \`\`\`

4. **Ejecuta la aplicación**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Abre en el navegador**
   Ve a [http://localhost:3000](http://localhost:3000)

## 🎯 Uso

### Crear un Ticket

1. Completa el formulario con tu información
2. Selecciona la categoría apropiada
3. Establece la prioridad
4. Envía el ticket
5. ¡Recibirás una respuesta automática en segundos!

### Ver Tickets

1. Cambia a la pestaña "Ver Tickets"
2. Observa todos los tickets en tiempo real
3. Ve las respuestas automáticas
4. Cambia el estado de los tickets

## 🔧 Estructura del Proyecto

\`\`\`
src/
├── app/
│ └── page.tsx # Página principal
├── components/
│ ├── TicketForm.tsx # Formulario de tickets
│ └── TicketList.tsx # Lista de tickets
├── lib/
│ └── firebase.ts # Configuración de Firebase
├── services/
│ └── ticketService.ts # Servicios de tickets
└── types/
└── ticket.ts # Tipos TypeScript
\`\`\`

## 🚀 Características Técnicas

### Respuestas Automáticas

El sistema genera respuestas automáticas basadas en la categoría:

- Se ejecutan 2 segundos después de crear el ticket
- Respuestas aleatorias de un pool por categoría
- Marcadas como "automáticas" en la interfaz

### Tiempo Real

- Utiliza Firebase Firestore listeners
- Actualizaciones automáticas sin refrescar
- Estado sincronizado entre pestañas

### Gestión de Estados

- Estados: abierto, en proceso, resuelto, cerrado
- Cambio de estado desde la interfaz
- Actualización inmediata en Firebase

## 🔒 Seguridad

**Importante**: La configuración actual es para desarrollo. Para producción:

1. Configura reglas de seguridad apropiadas en Firestore
2. Implementa autenticación de usuarios
3. Valida datos en el servidor
4. Usa variables de entorno para configuración

## 🚀 Deploy

Para hacer deploy en Vercel:

1. **Push a GitHub**
   \`\`\`bash
   git add .
   git commit -m "Sistema de tickets completo"
   git push origin main
   \`\`\`

2. **Conecta con Vercel**

   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Deploy automático

3. **Configura variables de entorno** (opcional)
   - Agrega tus credenciales de Firebase como variables de entorno
   - Actualiza el código para usar \`process.env\`

## 📝 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Panel de administración
- [ ] Notificaciones por email
- [ ] Sistema de archivos adjuntos
- [ ] Métricas y analytics
- [ ] API REST para integraciones
- [ ] Chatbot más avanzado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto fue desarrollado como una prueba técnica para Full Stack Developer.

---

**¡Disfruta usando el sistema de tickets! 🎉**
