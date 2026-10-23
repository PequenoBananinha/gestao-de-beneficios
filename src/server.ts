import express from "express";
import { prisma } from "./lib/prisma";

const app = express();

// parse requests with a Content-Type of application/json
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/funcionarios", async (_req, res) => {
  const funcionarios = await prisma.funcionarios.findMany();
  res.json(funcionarios);
});

app.post("/funcionarios", async (req, res) => {
  const { nome, matricula, cargo } = req.body;
  const funcionario = await prisma.funcionarios.create({
    data: { nome, matricula, cargo },
  });
  res.status(201).json(funcionario);
});

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});