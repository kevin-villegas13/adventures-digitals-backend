import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();
const authController = new AuthController();

router.post("/register", async (req, res) => {
  await authController.register(req, res);
});

router.post("/login", async (req, res) => {
  await authController.login(req, res);
});

router.post("/verify", async (req, res) => {
  await authController.verifyPassword(req, res);
});

export default router;
