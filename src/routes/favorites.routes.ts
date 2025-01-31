import { Router } from "express";
import { addFavorite, listFavorites, removeFavorite } from "../controllers/favoritesController";

const router = Router();

router
    .post('/favoritar/comic', addFavorite)
    .post('/desfavoritar/comic', removeFavorite)
    .get('/favoritos/listar', listFavorites)


export default router;