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

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});