// src/firebase.js
//
// IMPORTANTE: as credenciais do Firebase vêm do arquivo .env (modelo em .env.example).
// Como criar:
// 1. Acesse https://console.firebase.google.com/
// 2. Crie um novo projeto (ou use um existente)
// 3. Vá em "Configurações do projeto" > "Geral" > role até "Seus aplicativos"
//    e adicione um app da Web para gerar este objeto de configuração
// 4. No menu lateral, ative:
//    - Authentication > Sign-in method > E-mail/senha
//    - Firestore Database > Criar banco de dados (modo de teste ou produção com regras)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
