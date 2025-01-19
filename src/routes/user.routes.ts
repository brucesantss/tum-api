import { Router } from "express";
import { criarContaUsuario, excluirContaUsuario, getAllUsers, loginConta, logoutConta } from "../controllers/userController";

const router = Router();

router
    .get('/usuario/usuarios', getAllUsers)
    .post('/usuario/criarconta', criarContaUsuario)
    .post('/login', loginConta)
    .post('/usuario/excluir', excluirContaUsuario)
    .post('/logout', logoutConta)

export default router;