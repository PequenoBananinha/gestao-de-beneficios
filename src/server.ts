import express from "express";
import { prisma } from "./lib/prisma";
import { Prisma } from "./generated/prisma/client";

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

app.get("/funcionarios/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const funcionario = await prisma.funcionarios.findUnique({
    where: { id },
  });

  if (!funcionario) {
    return res.status(404).json({ error: "Funcionário não encontrado" });
  }

  return res.status(200).json(funcionario);
});

app.post("/funcionarios", async (req, res) => {
  const { nome, matricula, cargo } = req.body;
  try {
    const funcionario = await prisma.funcionarios.create({
      data: { nome, matricula, cargo },
    });
    res.status(201).json(funcionario);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ error: "Matrícula já existe" });
    }
    throw error;
  }
});

app.put("/funcionarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { nome, matricula, cargo, ativo } = req.body;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const funcionario = await prisma.funcionarios.update({
      where: { id },
      data: { nome, matricula, cargo, ativo },
    });
    res.status(200).json(funcionario);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "Matrícula já existe" });
      }
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Funcionário não encontrado" });
      }
    }
    throw error;
  }
});

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
