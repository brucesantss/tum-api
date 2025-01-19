import { Router } from "express";
import { createComic } from "../controllers/comicController";

const router = Router();

router
    .post('/comic/criar', createComic)

export default router;