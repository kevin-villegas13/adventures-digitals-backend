import express from "express";
import multer from "multer";
import { ProductController } from "../product/product.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const productController = new ProductController();

router.post(
  "/create",
  authMiddleware,
  upload.single("imagen"),
  async (req, res) => {
    await productController.createProduct(req, res);
  }
);

router.get("/", authMiddleware, async (req, res) => {
  await productController.getAllProducts(req, res);
});

router.get("/:id", authMiddleware, async (req, res) => {
  await productController.getProductById(req, res);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await productController.deleteProduct(req, res);
});

export default router;
