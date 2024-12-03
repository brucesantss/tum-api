import { Router } from "express";
import { criarContaUsuario, excluirContaUsuario, loginConta, logoutConta } from "../controllers/userController";

const router = Router();

router
    .post('/usuario/criarconta', criarContaUsuario)
    .post('/login', loginConta)
    .post('/usuario/excluir', excluirContaUsuario)
    .post('/logout', logoutConta)

export default router;