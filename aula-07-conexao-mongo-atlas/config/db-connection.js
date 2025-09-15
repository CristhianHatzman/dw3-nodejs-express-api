import mongoose from "mongoose";

const dbUser = "cristhianfatec";
const dbPassword = "UvaRoxa2504";

const connect = () => {
  mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.crswihy.mongodb.net/api-thegames?retryWrites=true&w=majority&appName=Cluster0`);
};

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Erro ao conectar com o mongoDB.");
});
connection.on("open", () => {
  console.log("Conetado ao mongoDB com sucesso.");
});
connect();
export default mongoose;
