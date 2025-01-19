import { Router } from "express";
import { procurarUsuarios } from "../controllers/adminController";

const router = Router();

router
    .get("/admin/usuarios", procurarUsuarios);

export default router;
