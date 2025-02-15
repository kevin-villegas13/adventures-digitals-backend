import { IsNumber, IsNotEmpty } from 'class-validator';

export class ConfirmPaymentDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la factura es obligatorio' })
  billId: number;
}
