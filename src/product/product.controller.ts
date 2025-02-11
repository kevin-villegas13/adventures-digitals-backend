import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/auth/decorador/roles.decorator';
import { RoleType } from 'src/user/enum/role.type';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Response } from 'src/common/response/type/response.type';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(RoleType.SELLER)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Response<Product>> {
    return this.productService.create(createProductDto, image);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Response<Product[]>> {
    return this.productService.findAll();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(RoleType.SELLER)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Response<Product>> {
    return this.productService.update(id, updateProductDto, image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(RoleType.SELLER)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<Response<null>> {
    return this.productService.remove(id);
  }
}
