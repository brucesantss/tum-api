import { Router } from "express";
import { uploadArquivo, upload } from "../services/storageService";

const route = Router();

route
    .post('/upload', upload.single('image'), uploadArquivo)

export default route;