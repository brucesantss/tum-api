import { Router } from "express";
import { criarContaUsuario, excluirContaUsuario, loginConta } from "../controllers/userController";

const router = Router();

router
    .post('/usuario/criarconta', criarContaUsuario)
    .post('/login', loginConta)
    .post('/usuario/excluir', excluirContaUsuario)

export default router;