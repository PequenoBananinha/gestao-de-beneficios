import express from "express";
import * as funcionariosController from "./controllers/funcionarios.controller";

const app = express();

// parse requests with a Content-Type of application/json
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/funcionarios", funcionariosController.listar);
app.get("/funcionarios/:id", funcionariosController.buscarPorId);
app.post("/funcionarios", funcionariosController.criar);
app.put("/funcionarios/:id", funcionariosController.atualizar);
app.delete("/funcionarios/:id", funcionariosController.remover);

export { app };