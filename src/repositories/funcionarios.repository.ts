import { prisma } from "../lib/prisma";

export type CriarFuncionarioDados = {
  nome: string;
  matricula: string;
  cargo?: string;
};

export type AtualizarFuncionarioDados = {
  nome?: string;
  matricula?: string;
  cargo?: string;
  ativo?: boolean;
};

export function listar() {
  return prisma.funcionarios.findMany();
}

export function buscarPorId(id: number) {
  return prisma.funcionarios.findUnique({
    where: { id },
  });
}

export function criar(dados: CriarFuncionarioDados) {
  return prisma.funcionarios.create({
    data: dados,
  });
}

export function atualizar(id: number, dados: AtualizarFuncionarioDados) {
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