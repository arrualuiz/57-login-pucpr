// src/firebase.js
//
// IMPORTANTE: substitua os valores abaixo pelas credenciais do SEU projeto Firebase.
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
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
