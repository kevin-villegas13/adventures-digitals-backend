import { Request, Response } from "express";
import { ProductoService } from "./product.service";

const productService = new ProductoService();

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const productData = req.body;
      const imageFile = req.file?.path;

      if (!imageFile) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const product = await productService.createProduct(
        productData,
        imageFile
      );
      res.status(201).json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    const page = Number(req.query.page as string) || 1;
    const limit = Number(req.query.limit as string) || 10;
    const searchQuery = (req.query.search as string) || "";
    try {
      const products = await productService.getAllProducts(
        page,
        limit,
        searchQuery
      );
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const products = await productService.getProductById(Number(id));
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(Number(id));
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
