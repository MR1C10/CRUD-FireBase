// src/App.js
import React, { useState, useEffect } from "react";
import { db, ref, set, get, child, update, remove } from "./firebase";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // Função para adicionar um usuário
  const adicionarUsuario = () => {
    const novoUsuarioRef = ref(db, "usuarios/" + nome);
    set(novoUsuarioRef, {
      nome: nome,
      email: email,
    })
      .then(() => {
        alert("Usuário adicionado com sucesso!");
        setNome("");
        setEmail("");
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
          console.log("Não há dados disponíveis");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função para atualizar os dados de um usuário
  const atualizarUsuario = (id) => {
    const usuarioRef = ref(db, "usuarios/" + id);
    update(usuarioRef, {
      nome: nome,
      email: email,x
    })
      .then(() => {
        alert("Usuário atualizado com sucesso!");
        setNome("");
        setEmail("");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao atualizar o usuário.");
      });
  };

  // Função para excluir um usuário
  const excluirUsuario = (id) => {
    const usuarioRef = ref(db, "usuarios/" + id);
    remove(usuarioRef)
      .then(() => {
        alert("Usuário excluído com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao excluir o usuário.");
      });
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="App">
      <h1>CRUD com Firebase</h1>
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={adicionarUsuario}>Adicionar</button>
      </div>

      <h2>Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.nome}</strong> - {usuario.email}
            <button onClick={() => atualizarUsuario(usuario.id)}>Atualizar</button>
            <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
