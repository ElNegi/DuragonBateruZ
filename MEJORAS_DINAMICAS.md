/* firebase-init.js
   -----------------------------------------------------------------------
   Inicialización única y compartida de Firebase para Ecos de Ki.
   Vite empaqueta estos imports; no se depende de scripts CDN externos.
*/
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBefHo9p2GBLEM4Xxw_VfOlslvvCP9d_-w",
  authDomain: "dragonlike-3f51d.firebaseapp.com",
  projectId: "dragonlike-3f51d",
  storageBucket: "dragonlike-3f51d.firebasestorage.app",
  messagingSenderId: "1043327320401",
  appId: "1:1043327320401:web:b31617d1452d410f45d370"
};

// Evita una segunda inicialización si Vite/HMR o dos módulos importan este
// archivo casi al mismo tiempo.
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

auth.languageCode = 'es';

window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseConfigPublic = {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
};
