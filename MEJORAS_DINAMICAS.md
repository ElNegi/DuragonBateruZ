/* firebase-init.js
   -----------------------------------------------------------------------
   Inicializa Firebase con el SDK modular (instalado vía npm) y expone
   `app`/`auth`/`db` de dos formas:
     1) como exports ES6, para cuando migremos auth.js/game.js a módulos.
     2) en `window`, para que los scripts clásicos actuales (auth.js,
        game.js) puedan usarlos sin tener que convertir todo el proyecto
        de golpe.

   Este archivo se carga como <script type="module"> ANTES que auth.js,
   map.js y game.js en index.html — para cuando su listener de
   DOMContentLoaded se ejecuta, window.firebaseAuth / window.firebaseDb
   ya están disponibles.
*/
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración del proyecto "dragonlike" en Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyBefHo9p2GBLEM4Xxw_VfOlslvvCP9d_-w",
  authDomain: "dragonlike-3f51d.firebaseapp.com",
  projectId: "dragonlike-3f51d",
  storageBucket: "dragonlike-3f51d.firebasestorage.app",
  messagingSenderId: "1043327320401",
  appId: "1:1043327320401:web:b31617d1452d410f45d370"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
