import gameServices from "../services/gameServices.js";

const getAllGames = async (req, res) => {
  try {
    const games = await gameServices.getAll();
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Erro Interno do servidor." });
  }
};

const createNewGame = async (req, res) => {
  try {
    const { title, year, genre, platform, price } = req.body;
    await gameServices.CreateGame(title, year, genre, platform, price);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Erro interno do servidor." });
  }
};
export default { getAllGames, createNewGame };
