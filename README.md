![alt text](src/assets/image.png)
# CRUD com React e Firebase

Este projeto é uma aplicação CRUD (Create, Read, Update, Delete) desenvolvida com React e Firebase Realtime Database. A aplicação permite gerenciar usuários, oferecendo funcionalidades para adicionar, listar, atualizar e excluir registros em tempo real.

## 🚀 Funcionalidades

- ✅ **Criar**: Adicionar novos usuários com nome e e-mail
- 📖 **Ler**: Listar todos os usuários cadastrados
- ✏️ **Atualizar**: Modificar informações de usuários existentes
- 🗑️ **Excluir**: Remover usuários do banco de dados
- 🔄 **Tempo Real**: Sincronização automática com Firebase

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) - Biblioteca para construção da interface
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Firebase](https://firebase.google.com/) - Backend as a Service (Realtime Database)
- [ESLint](https://eslint.org/) - Linting para qualidade do código

## 📁 Estrutura do Projeto

```bash
src
├── components
│   ├── UserForm.jsx
│   └── UserList.jsx
├── firebase
│   └── config.js
├── App.jsx
├── main.jsx
└── styles.css
```

## 🔧 Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o Firebase no arquivo `src/firebase/config.js`
4. Inicie o servidor de desenvolvimento: `npm run dev`

---