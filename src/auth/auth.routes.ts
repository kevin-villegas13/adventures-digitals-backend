import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

// Asegúrate de pasar la configuración de manera correcta
router.post("/register", AuthController.register);

export default router;
