import { Router } from "express";
import { planContract } from "../controllers/planController";

const route = Router();

route
    .post('/plans', planContract)

export default route;