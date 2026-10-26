import { z } from "zod";
import { ptBR } from "zod/locales"
 
z.config(ptBR());

export const criarFuncionarioSchema = z.object({
  nome: z.string().trim().min(1),
  cargo: z.string().trim().min(1).optional(),
  matricula: z.string().trim().min(1),
});

export const atualizarFuncionarioSchema = criarFuncionarioSchema
  .partial()
  .extend({ ativo: z.boolean().optional() });

export const idParamSchema = z.object({
  id: z.coerce
    .number("ID inválido")
    .int("ID inválido")
    .positive("ID inválido"),
});

export type CriarFuncionarioInput = z.infer<typeof criarFuncionarioSchema>;
export type AtualizarFuncionarioInput = z.infer<typeof atualizarFuncionarioSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;