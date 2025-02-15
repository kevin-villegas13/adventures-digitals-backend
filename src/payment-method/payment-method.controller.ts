import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorador/roles.decorator';
import { RoleType } from 'src/role/enum/role.type';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.BUYER)
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ) {
    const userId = req.user.id;
    return this.paymentMethodService.create(req, createPaymentMethodDto);
  }
}
