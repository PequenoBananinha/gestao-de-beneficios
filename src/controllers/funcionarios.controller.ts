import type { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import * as funcionariosService from "../services/funcionarios.service";

export async function listar(_req: Request, res: Response) {
  const funcionarios = await funcionariosService.listar();
  return res.json(funcionarios);
}

export async function buscarPorId(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const funcionario = await funcionariosService.buscarPorId(id);

  return res.status(200).json(funcionario);
}

export async function criar(req: Request, res: Response) {
  const { nome, matricula, cargo } = req.body;

  try {
    const funcionario = await funcionariosService.criar({
      nome,
      matricula,
      cargo,
    });
    return res.status(201).json(funcionario);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ error: "Matrícula já existe" });
    }
    throw error;
  }
}

export async function atualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { nome, matricula, cargo, ativo } = req.body;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const funcionario = await funcionariosService.atualizar(id, {
      nome,
      matricula,
      cargo,
      ativo,
    });
    return res.status(200).json(funcionario);
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
}

export async function remover(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    await funcionariosService.remover(id);
    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Funcionário não encontrado" });
      }
    }
    throw error;
  }
}
