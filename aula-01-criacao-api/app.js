import express from "express";
const app = express();

//Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Criando retorno da API
app.get("/", (req, res) => {
  const games = [
    {
      title: "Delta Force",
      year: 2024,
      genre: "FPS",
      platform: "PC (Windows)",
      price: 0,
    },
    {
      title: "Diablo III",
      year: 2009,
      genre: "RPG",
      platform: "PC (Windows)",
      price: 150,
    },
    {
      title: "Counter-Strike 2",
      year: 2023,
      genre: "FPS",
      platform: "PC (Windows)",
      price: 75,
    },
  ];
  res.json(games);
});

const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em http://localhost:${port}`);
});
