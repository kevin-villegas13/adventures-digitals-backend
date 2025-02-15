import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethod } from './entities/payment-method.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod, User]), AuthModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
