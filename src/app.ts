import express from "express";
import { funcionariosRouter } from "./routes/funcionarios.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Todas as rotas de funcionários ficam agrupadas sob o prefixo "/funcionarios"
app.use("/funcionarios", funcionariosRouter);

export { app };