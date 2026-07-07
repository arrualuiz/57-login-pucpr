import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro(false);
    setCarregando(true);

    try {
      // Valida e-mail e senha no Firebase Authentication
      const credenciais = await signInWithEmailAndPassword(auth, email, senha);
      const uid = credenciais.user.uid;

      // Login correto: navega para a página Principal levando o uid
      navigate("/principal", { state: { uid } });
    } catch (error) {
      setErro(true);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setMensagem("Usuário não está cadastrado.");
      } else if (error.code === "auth/invalid-email") {
        setMensagem("E-mail inválido.");
      } else {
        setMensagem("Erro ao acessar. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
            />
          </div>

          <button className="btn-primary" type="submit" disabled={carregando}>
            {carregando ? "Acessando..." : "Acessar"}
          </button>
        </form>

        {mensagem && (
          <p className={`message ${erro ? "error" : "success"}`}>{mensagem}</p>
        )}

        <div className="link-row">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
