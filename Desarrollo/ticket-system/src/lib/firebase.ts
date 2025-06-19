import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Configuración demo mejorada para desarrollo
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Para desarrollo: usar configuración que evite errores de red
// Si quieres usar Firebase real, reemplaza esta configuración con tus credenciales reales
// siguiendo las instrucciones en CONFIGURACION_FIREBASE.md

export { db };
export default app;
