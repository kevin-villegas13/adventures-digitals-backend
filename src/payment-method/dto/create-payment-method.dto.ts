import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsEnum(['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER'])
  type: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';

  @IsString()
  @Length(4, 4, { message: 'lastFourDigits debe tener exactamente 4 dígitos' })
  lastFourDigits: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
