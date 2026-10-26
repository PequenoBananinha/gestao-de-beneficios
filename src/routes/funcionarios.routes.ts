import {Router} from "express";
import * as funcionariosController from "../controllers/funcionarios.controller";

const router = Router();

router.get("/", funcionariosController.listar);
router.get("/:id", funcionariosController.buscarPorId);
router.post("/", funcionariosController.criar);
router.put("/:id", funcionariosController.atualizar);
router.delete("/:id", funcionariosController.remover);

export { router as funcionariosRouter };