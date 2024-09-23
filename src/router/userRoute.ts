import { Router } from "express";
import { criarConta, loginConta } from "../controller/userController";

const router = Router();

router
    .post('/criarconta', criarConta)
    .post('/login', loginConta)

export default router;