import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Cadastro() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro(false);
    setCarregando(true);

    try {
      // Cria o usuário no Firebase Authentication (provedor E-mail/senha)
      const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = credenciais.user.uid;

      // Grava os dados adicionais no Firestore, incluindo o UID do usuário
      await setDoc(doc(db, "usuarios", uid), {
        uid,
        nome,
        sobrenome,
        dataNascimento,
        email,
      });

      setErro(false);
      setMensagem("Cadastro realizado com sucesso!");

      // Redireciona para a tela de Login após o cadastro
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      setErro(true);
      if (error.code === "auth/email-already-in-use") {
        setMensagem("Este e-mail já está cadastrado.");
      } else if (error.code === "auth/weak-password") {
        setMensagem("A senha deve ter pelo menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        setMensagem("E-mail inválido.");
      } else {
        setMensagem("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Cadastro</h1>
        <form onSubmit={handleCadastro}>
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              id="sobrenome"
              type="text"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              id="dataNascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button className="btn-primary" type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {mensagem && (
          <p className={`message ${erro ? "error" : "success"}`}>{mensagem}</p>
        )}

        <div className="link-row">
          Já tem uma conta? <Link to="/">Fazer login</Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
