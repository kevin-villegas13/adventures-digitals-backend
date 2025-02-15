import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class BillDetailDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto o servicio es obligatorio' })
  itemName: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El precio unitario es obligatorio' })
  unitPrice: number;
}
