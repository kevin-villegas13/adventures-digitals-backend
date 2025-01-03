import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

const authController = new AuthController();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/verify", (req, res) => authController.verifyPassword(req, res));

export default router;
