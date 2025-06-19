# Configuración de Firebase

## Pasos para configurar Firebase

### 1. Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto" o "Agregar proyecto"
3. Ingresa el nombre del proyecto: `ticket-system` (o el nombre que prefieras)
4. Acepta los términos y continúa
5. Configura Google Analytics (opcional, puedes omitirlo para esta demo)
6. Haz clic en "Crear proyecto"

### 2. Configurar Firestore Database

1. En el panel izquierdo, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Elige una ubicación (recomendado: us-central1 para menor latencia)
5. Haz clic en "Listo"

### 3. Configurar reglas de seguridad (SOLO PARA DESARROLLO)

En la pestaña "Reglas" de Firestore, reemplaza el contenido con:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /{document=\*\*} {
allow read, write: if true;
}
}
}
\`\`\`

**⚠️ IMPORTANTE**: Estas reglas permiten acceso completo. Para producción, implementa reglas de seguridad apropiadas.

### 4. Obtener configuración de la aplicación web

1. En el panel principal, haz clic en el ícono de engranaje (⚙️) junto a "Descripción general del proyecto"
2. Selecciona "Configuración del proyecto"
3. Desplázate hacia abajo hasta "Tus aplicaciones"
4. Haz clic en "Agregar aplicación" y selecciona el ícono web (</>)
5. Ingresa un apodo para la aplicación: `ticket-system-web`
6. NO marques "También configura Firebase Hosting"
7. Haz clic en "Registrar aplicación"
8. Copia la configuración que aparece (será algo como esto):

\`\`\`javascript
const firebaseConfig = {
apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
authDomain: "tu-proyecto-xxxxx.firebaseapp.com",
projectId: "tu-proyecto-xxxxx",
storageBucket: "tu-proyecto-xxxxx.appspot.com",
messagingSenderId: "123456789012",
appId: "1:123456789012:web:abcdefghijklmnop"
};
\`\`\`

### 5. Actualizar la configuración en el proyecto

1. Abre el archivo \`src/lib/firebase.ts\`
2. Reemplaza la configuración demo con tus valores reales:

\`\`\`typescript
const firebaseConfig = {
apiKey: "tu-api-key-real",
authDomain: "tu-proyecto.firebaseapp.com",
projectId: "tu-proyecto-id",
storageBucket: "tu-proyecto.appspot.com",
messagingSenderId: "123456789",
appId: "tu-app-id"
};
\`\`\`

### 6. Verificar la conexión

1. Ejecuta \`npm run dev\`
2. Ve a http://localhost:3000
3. Crea un ticket de prueba
4. Verifica en Firebase Console > Firestore Database que se creó la colección "tickets"

## Estructura de datos en Firestore

La aplicación creará automáticamente esta estructura:

\`\`\`
tickets/ (colección)
├── [ticket-id-1]/ (documento)
│ ├── subject: string
│ ├── description: string
│ ├── status: string
│ ├── priority: string
│ ├── category: string
│ ├── customerEmail: string
│ ├── customerName: string
│ ├── createdAt: timestamp
│ ├── updatedAt: timestamp
│ └── responses: array
│ └── [
│ {
│ id: string,
│ message: string,
│ isAutomatic: boolean,
│ author: string,
│ createdAt: timestamp
│ }
│ ]
\`\`\`

## Solución de problemas

### Error de permisos

Si ves errores de permisos:

1. Verifica que las reglas de Firestore estén configuradas correctamente
2. Asegúrate de que el proyecto esté activo en Firebase Console

### Error de configuración

Si ves errores de configuración:

1. Verifica que la configuración en \`firebase.ts\` sea correcta
2. Asegúrate de que el proyecto ID coincida exactamente
3. Verifica que Firestore esté habilitado en tu proyecto

### No se crean documentos

Si los tickets no se guardan:

1. Abre las herramientas de desarrollador del navegador
2. Revisa la consola en busca de errores
3. Verifica la conexión a internet
4. Asegúrate de que Firestore esté en modo de prueba

¡Listo! Tu sistema de tickets debería funcionar perfectamente con Firebase.
