import { AppError } from "../errors/app-error";
import * as funcionariosRepository from "../repositories/funcionarios.repository";

import type {
  CriarFuncionarioInput,
  AtualizarFuncionarioInput,
} from "../schemas/funcionarios.schema";

export function listar() {
  return funcionariosRepository.listar();
}

export async function buscarPorId(id: number) {
  const funcionario = await funcionariosRepository.buscarPorId(id);

  if (!funcionario) {
    throw new AppError(404, "Funcionário não encontrado");
  }

  return funcionario;
}

export function criar(dados: CriarFuncionarioInput) {
  return funcionariosRepository.criar(dados);
}

export async function atualizar(id: number, dados: AtualizarFuncionarioInput) {
  await buscarPorId(id);
  return funcionariosRepository.atualizar(id, dados);
}

export async function remover(id: number) {
  await buscarPorId(id);
  return funcionariosRepository.remover(id);
}
