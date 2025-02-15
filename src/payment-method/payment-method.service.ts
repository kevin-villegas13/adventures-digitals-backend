import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Repository } from 'typeorm';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { Response } from '../common/response/type/response.type';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    req: AuthenticatedRequest,
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<Response<PaymentMethod>> {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const existingPaymentMethod = await this.paymentMethodRepository.findOne({
      where: {
        user: { id: user.id },
        type: createPaymentMethodDto.type,
        lastFourDigits: createPaymentMethodDto.lastFourDigits,
      },
    });

    if (existingPaymentMethod)
      throw new ConflictException('Este método de pago ya está registrado');

    const paymentMethod = this.paymentMethodRepository.create({
      ...createPaymentMethodDto,
      user,
    });

    const savedPaymentMethod =
      await this.paymentMethodRepository.save(paymentMethod);

    return {
      status: true,
      message: 'Método de pago agregado correctamente',
      data: savedPaymentMethod,
    };
  }
}
