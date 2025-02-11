import { Module } from '@nestjs/common';
import { DashboardBuyerService } from './dashboard-buyer.service';
import { DashboardBuyerController } from './dashboard-buyer.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DashboardBuyerController],
  providers: [DashboardBuyerService],
})
export class DashboardBuyerModule {}
