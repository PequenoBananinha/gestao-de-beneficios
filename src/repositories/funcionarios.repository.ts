import { prisma } from "../lib/prisma";
import type { CriarFuncionarioInput, AtualizarFuncionarioInput } from "../schemas/funcionarios.schema";

export function listar() {
  return prisma.funcionarios.findMany();
}

export function buscarPorId(id: number) {
  return prisma.funcionarios.findUnique({
    where: { id },
  });
}

export function criar(dados: CriarFuncionarioInput) {
  return prisma.funcionarios.create({
    data: dados,
  });
}

export function atualizar(id: number, dados: AtualizarFuncionarioInput) {
  return prisma.funcionarios.update({
    where: { id },
    data: dados,
  });
}

export function remover(id: number) {
  return prisma.funcionarios.delete({
    where: { id },
  });
}