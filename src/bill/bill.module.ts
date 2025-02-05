import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from './entities/bill.entity';
import { Detail } from './entities/detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Detail])],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
