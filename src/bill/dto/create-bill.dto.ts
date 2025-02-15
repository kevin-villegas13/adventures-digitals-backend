import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { BillDetailDto } from './bill-detail.dto';

export class CreateBillDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El total es obligatorio' })
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillDetailDto)
  details: BillDetailDto[];
}
