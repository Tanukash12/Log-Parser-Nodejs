import { Router } from "express";
import logRoutes from "./logRoutes"; 

const router = Router();

router.use("/", logRoutes);

export default router;