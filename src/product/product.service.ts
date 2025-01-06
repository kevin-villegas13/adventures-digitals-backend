import { Like } from "typeorm";
import cloudinary from "../common/helper/config/cloudinary";
import { Paginator } from "../common/helper/paginator/paginator.helper";
import { ResponseList } from "../common/helper/paginator/type/paginator.interface";
import { AppDataSource } from "../database/database";
import { Categoria } from "../entities/category-entity";
import { Producto } from "../entities/product-entity";
import { CreateProductDto } from "./dto/create-product.dto";

export class ProductoService {
  private readonly productoRepository = AppDataSource.getRepository(Producto);
  private readonly categoriaRepository = AppDataSource.getRepository(Categoria);

  async createProduct(createProductDto: CreateProductDto, imageFile: string) {
    try {
      const uploadResult = await cloudinary.uploader.upload(imageFile, {
        folder: "products",
      });

      const existingProduct = await this.productoRepository.findOne({
        where: { nombre: createProductDto.nombre },
      });

      if (existingProduct)
        throw new Error("El producto ya existe en la base de datos.");

      let categoria = await this.categoriaRepository.findOne({
        where: { nombre: createProductDto.categoria },
      });

      if (!categoria) {
        categoria = this.categoriaRepository.create({
          nombre: createProductDto.categoria,
        });

        categoria = await this.categoriaRepository.save(categoria);
      }

      const newProduct = this.productoRepository.create({
        ...createProductDto,
        imagen: uploadResult.secure_url,
        categoria,
      });

      return await this.productoRepository.save(newProduct);
    } catch (error: any) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async getAllProducts(
    page: number,
    limit: number,
    searchQuery: string
  ): Promise<ResponseList<Producto>> {
    const searchFilter = searchQuery
      ? {
          where: [
            { nombre: Like(`%${searchQuery}%`) },
            { descripcion: Like(`%${searchQuery}%`) },
          ],
        }
      : {};

    const [products, total] = await this.productoRepository.findAndCount({
      relations: ["categoria"],
      skip: (page - 1) * limit,
      take: limit,
      ...searchFilter,
    });
    
    return Paginator.Format(products, total, page, limit);
  }

  async getProductById(id: number) {
    return this.productoRepository.findOne({
      where: { id },
      relations: ["categoria"],
    });
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    if (!product) throw new Error("Product not found");

    // Delete image from Cloudinary
    const imagePublicId = product.imagen?.split("/").pop()?.split(".")[0];

    if (imagePublicId)
      await cloudinary.uploader.destroy(`products/${imagePublicId}`);

    return this.productoRepository.remove(product);
  }
}
