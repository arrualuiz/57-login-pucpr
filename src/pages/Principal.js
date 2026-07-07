import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Principal() {
  const location = useLocation();
  const navigate = useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    // Usa o uid vindo da navegação (Login) ou, como fallback,
    // observa o estado de autenticação do Firebase
    const uidDaNavegacao = location.state?.uid;

    const buscarDados = async (uid) => {
      try {
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDadosUsuario(docSnap.data());
        } else {
          setErro("Dados do usuário não encontrados no Firestore.");
        }
      } catch (e) {
        setErro("Erro ao buscar os dados do usuário.");
      } finally {
        setCarregando(false);
      }
    };

    if (uidDaNavegacao) {
      buscarDados(uidDaNavegacao);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          buscarDados(user.uid);
        } else {
          // Ninguém logado: volta para o login
          navigate("/");
        }
      });
      return () => unsubscribe();
    }
  }, [location.state, navigate]);

  const handleSair = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (carregando) {
    return (
      <div className="page-container">
        <div className="card">
          <h1>Principal</h1>
          <p className="message">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card">
        <h1>Principal</h1>

        {erro && <p className="message error">{erro}</p>}

        {dadosUsuario && (
          <div>
            <div className="info-row">
              <span>Nome:</span>
              <span>{dadosUsuario.nome}</span>
            </div>
            <div className="info-row">
              <span>Sobrenome:</span>
              <span>{dadosUsuario.sobrenome}</span>
            </div>
            <div className="info-row">
              <span>Data de Nascimento:</span>
              <span>{dadosUsuario.dataNascimento}</span>
            </div>
          </div>
        )}

        <button className="btn-primary" style={{ marginTop: 24 }} onClick={handleSair}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Principal;
