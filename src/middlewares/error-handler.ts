import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../errors/app-error";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: err.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensagem: issue.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "Matrícula já existe",
      });
    }

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Funcionário não encontrado",
      });
    }
  }

  console.error("Erro interno não tratado:", err);
  return res.status(500).json({
    error: "Erro interno do servidor",
  });
}
