import express from "express";
import { authMiddleware } from "../auth/auth.middleware";
import { UserController } from "./user.controller";

const router = express.Router();

const userController = new UserController();

router.get("/me", authMiddleware, async (req, res) => {
  await userController.getUserInfo(req, res);
});

router.put("/update-role", authMiddleware, async (req, res) => {
  await userController.updateRole(req, res);
});

export default router;
