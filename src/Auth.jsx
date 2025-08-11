import React, { useState } from "react";
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "./firebase";
import "./Auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos!");
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, senha);
        alert("Login realizado com sucesso!");
      } else {
        // Registro
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Conta criada com sucesso!");
      }
    } catch (error) {
      console.error("Erro:", error);
      
      // Tratamento de erros específicos
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Este email já está sendo usado!");
          break;
        case "auth/weak-password":
          alert("A senha é muito fraca!");
          break;
        case "auth/user-not-found":
          alert("Usuário não encontrado!");
          break;
        case "auth/wrong-password":
          alert("Senha incorreta!");
          break;
        case "auth/invalid-email":
          alert("Email inválido!");
          break;
        case "auth/user-disabled":
          alert("Usuário desabilitado!");
          break;
        case "auth/too-many-requests":
          alert("Muitas tentativas. Tente novamente mais tarde!");
          break;
        default:
          alert("Erro: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Entrar" : "Criar Conta"}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha (mín. 6 caracteres)"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Carregando..." : (isLogin ? "Entrar" : "Criar Conta")}
          </button>
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="toggle-button"
              disabled={loading}
            >
              {isLogin ? "Criar conta" : "Fazer login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
