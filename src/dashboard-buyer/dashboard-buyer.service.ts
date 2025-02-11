import { Injectable } from '@nestjs/common';
import { CreateDashboardBuyerDto } from './dto/create-dashboard-buyer.dto';
import { UpdateDashboardBuyerDto } from './dto/update-dashboard-buyer.dto';

@Injectable()
export class DashboardBuyerService {
  create(createDashboardBuyerDto: CreateDashboardBuyerDto) {
    return 'This action adds a new dashboardBuyer';
  }

  findAll() {
    return `This action returns all dashboardBuyer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboardBuyer`;
  }

  update(id: number, updateDashboardBuyerDto: UpdateDashboardBuyerDto) {
    return `This action updates a #${id} dashboardBuyer`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboardBuyer`;
  }
}
