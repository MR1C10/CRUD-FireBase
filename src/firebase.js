// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, remove, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaIvkSZXZshiVSVg24t5n04sqqUyuCRdg",
  authDomain: "crudaula-af99b.firebaseapp.com",
  databaseURL: "https://crudaula-af99b-default-rtdb.firebaseio.com/",
  projectId: "crudaula-af99b",
  storageBucket: "crudaula-af99b.firebasestorage.app",
  messagingSenderId: "658722810741",
  appId: "1:658722810741:web:cf4f09a6aca71968a4013c",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child, remove, update };
