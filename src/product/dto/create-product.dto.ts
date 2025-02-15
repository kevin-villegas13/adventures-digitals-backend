import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  brand: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  stock: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  rating?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  categoryId: number;
}
