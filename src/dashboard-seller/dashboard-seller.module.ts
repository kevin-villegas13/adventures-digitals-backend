import { Module } from '@nestjs/common';
import { DashboardSellerService } from './dashboard-seller.service';
import { DashboardSellerController } from './dashboard-seller.controller';

@Module({
  controllers: [DashboardSellerController],
  providers: [DashboardSellerService],
})
export class DashboardSellerModule {}
