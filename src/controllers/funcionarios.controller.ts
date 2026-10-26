import type { Request, Response } from "express";
import * as funcionariosService from "../services/funcionarios.service";
import {
  atualizarFuncionarioSchema,
  criarFuncionarioSchema,
  idParamSchema,
} from "../schemas/funcionarios.schema";

export async function listar(_req: Request, res: Response) {
  const funcionarios = await funcionariosService.listar();
  return res.json(funcionarios);
}

export async function buscarPorId(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);

  const funcionario = await funcionariosService.buscarPorId(id);

  return res.status(200).json(funcionario);
}

export async function criar(req: Request, res: Response) {
  const dados = criarFuncionarioSchema.parse(req.body);

  const novoFuncionario = await funcionariosService.criar(dados);

  return res.status(201).json(novoFuncionario);
}

export async function atualizar(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);
  const dados =  atualizarFuncionarioSchema.parse(req.body);

  const funcionarioAtualizado = await funcionariosService.atualizar(id, dados);

  return res.status(200).json(funcionarioAtualizado);
}

export async function remover(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);

  await funcionariosService.remover(id);

  return res.sendStatus(204);
}
