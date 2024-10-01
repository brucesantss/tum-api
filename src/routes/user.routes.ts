import { Router } from "express";
import { criarContaUsuario, loginConta } from "../controllers/userController";

const router = Router();

router
    .post('/usuario/criarconta', criarContaUsuario)
    .post('/login', loginConta)

export default router;