import { Router } from "express";
import { createComic, listarComics } from "../controllers/comicController";

const router = Router();

router
    .post('/comic/criar', createComic)
    .get('/comic/listar', listarComics)

export default router;