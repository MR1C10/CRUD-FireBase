import React, { useState, useEffect } from "react";
import { db, ref, set, get, child, update, remove } from "./firebase";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // Função para adicionar um usuário
  const adicionarUsuario = () => {
    if (!nome || !email) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const novoUsuarioRef = ref(db, "usuarios/" + Date.now());
    set(novoUsuarioRef, {
      nome: nome,
      email: email,
    })
      .then(() => {
        alert("Usuário adicionado com sucesso!");
        setNome("");
        setEmail("");
        carregarUsuarios();
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao adicionar o usuário.");
      });
  };

  // Função para ler os usuários do Firebase
  const carregarUsuarios = () => {
    const usuariosRef = ref(db, "usuarios/");
    get(usuariosRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dados = snapshot.val();
          const listaUsuarios = Object.keys(dados).map((key) => ({
            id: key,
            ...dados[key],
          }));
          setUsuarios(listaUsuarios);
        } else {
          setUsuarios([]);
          console.log("Não há dados disponíveis");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função para preparar edição de um usuário
  const prepararEdicao = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditandoId(usuario.id);
  };

  // Função para atualizar os dados de um usuário
  const atualizarUsuario = () => {
    if (!nome || !email) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const usuarioRef = ref(db, "usuarios/" + editandoId);
    update(usuarioRef, {
      nome: nome,
      email: email,
    })
      .then(() => {
        alert("Usuário atualizado com sucesso!");
        setNome("");
        setEmail("");
        setEditandoId(null);
        carregarUsuarios();
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao atualizar o usuário.");
      });
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setNome("");
    setEmail("");
    setEditandoId(null);
  };

  // Função para excluir um usuário
  const excluirUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      const usuarioRef = ref(db, "usuarios/" + id);
      remove(usuarioRef)
        .then(() => {
          alert("Usuário excluído com sucesso!");
          carregarUsuarios();
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao excluir o usuário.");
        });
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>CRUD com React + Firebase</h1>
      </div>

      <div className="form-container">
        <h3 style={{ marginBottom: "20px", color: "#333" }}>
          {editandoId ? "Editar Usuário" : "Adicionar Novo Usuário"}
        </h3>
        <div className="form-row">
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {editandoId ? (
            <>
              <button className="btn-primary" onClick={atualizarUsuario}>
                Salvar Alterações
              </button>
              <button 
                className="btn-delete" 
                onClick={cancelarEdicao}
                style={{ background: "#6c757d" }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={adicionarUsuario}>
              Adicionar Usuário
            </button>
          )}
        </div>
      </div>

      <div className="users-section">
        <div className="users-header">
          <h2>Lista de Usuários</h2>
          <span className="users-count">
            {usuarios.length} usuário{usuarios.length !== 1 ? "s" : ""}
          </span>
        </div>

        {usuarios.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>Nenhum usuário cadastrado</h3>
            <p>Adicione o primeiro usuário usando o formulário acima</p>
          </div>
        ) : (
          <ul className="users-grid">
            {usuarios.map((usuario) => (
              <li key={usuario.id} className="user-card">
                <div className="user-info">
                  <div className="user-name">{usuario.nome}</div>
                  <div className="user-email">{usuario.email}</div>
                </div>
                <div className="user-actions">
                  <button 
                    className="btn-update" 
                    onClick={() => prepararEdicao(usuario)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => excluirUsuario(usuario.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
