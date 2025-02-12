import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../category/entities/category.entity';
import { Response } from 'src/common/response/type/response.type';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<Response<Product>> {
    const { categoryId, ...productData } = createProductDto;

    const product = this.productRepository.create(productData);

    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      if (!category)
        throw new NotFoundException(`Category with ID ${categoryId} not found`);

      product.category = category;
    }

    if (image) {
      const uploadResult = await this.cloudinaryService.uploadFile(image);
      product.image = uploadResult.secure_url;
    }

    const savedProduct = await this.productRepository.save(product);

    return {
      status: true,
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  async findAll(): Promise<Response<Product[]>> {
    const products = await this.productRepository.find({
      where: { stock: 1 },
      relations: ['category'],
    });

    return {
      status: true,
      message: 'Products retrieved successfully',
      data: products,
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    image?: Express.Multer.File,
  ): Promise<Response<Product>> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);

    if (image) {
      const uploadResult = await this.cloudinaryService.uploadFile(image);
      product.image = uploadResult.secure_url;
    }

    Object.assign(product, updateProductDto);

    const updatedProduct = await this.productRepository.save(product);

    return {
      status: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number): Promise<Response<null>> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);

    await this.productRepository.remove(product);

    return {
      status: true,
      message: 'Product deleted successfully',
      data: null,
    };
  }
}
