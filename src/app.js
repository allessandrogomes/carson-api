import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connectionAPI = await connectToDatabase();

connectionAPI.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

connectionAPI.once("open", () => {
    console.log("Conexão bem sucedida.")
});

const app = express();
routes(app);

export default app