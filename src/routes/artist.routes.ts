import { Router } from "express";
import { criarContaArtista } from "../controllers/artistController";

const router = Router();

router
    .post('/artista/criarconta', criarContaArtista)

export default router;