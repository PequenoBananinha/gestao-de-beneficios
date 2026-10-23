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

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
