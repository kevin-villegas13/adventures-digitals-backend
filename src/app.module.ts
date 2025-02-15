import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { BillModule } from './bill/bill.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DashboardBuyerModule } from './dashboard-buyer/dashboard-buyer.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    RoleModule,
    ProductModule,
    CategoryModule,
    BillModule,
    PaymentMethodModule,
    AuthModule,
    DashboardBuyerModule,
  ],
})
export class AppModule {}
