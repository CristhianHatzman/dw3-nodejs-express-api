import express from "express";
const app = express();
import mongoose from "mongoose";
//importando para ser criado no banco de dados
import Game from "./models/Games.js";
import User from "./models/Users.js";

import gameRoutes from "./routes/gameRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
// Faz a leitura do arquivo .env no projeto
dotenv.config();
// Pegando a variável PORT do .env
const port = process.env.PORT || 3200;

//Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Conexão com o banco de dados MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/api-thegames");

app.use("/", gameRoutes);
app.use("/", userRoutes);

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em http://localhost:${port}`);
});
