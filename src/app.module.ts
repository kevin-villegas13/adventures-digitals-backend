import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { BillModule } from './bill/bill.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    ProductModule,
    BillModule,
    PaymentMethodModule,
    AuthModule,
  ],
})
export class AppModule {}
