import * as funcionariosRepository from "../repositories/funcionarios.repository";

import type {
  CriarFuncionarioDados,
  AtualizarFuncionarioDados,
} from "../repositories/funcionarios.repository";

export function listar() {
  return funcionariosRepository.listar();
}

export function buscarPorId(id: number) {
  return funcionariosRepository.buscarPorId(id);
}

export function criar(dados: CriarFuncionarioDados) {
  return funcionariosRepository.criar(dados);
}

export function atualizar(id: number, dados: AtualizarFuncionarioDados) {
  return funcionariosRepository.atualizar(id, dados);
}

export function remover(id: number) {
  return funcionariosRepository.remover(id);
}