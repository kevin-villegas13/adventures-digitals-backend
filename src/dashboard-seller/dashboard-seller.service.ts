import { Injectable } from '@nestjs/common';
import { CreateDashboardSellerDto } from './dto/create-dashboard-seller.dto';
import { UpdateDashboardSellerDto } from './dto/update-dashboard-seller.dto';

@Injectable()
export class DashboardSellerService {
  create(createDashboardSellerDto: CreateDashboardSellerDto) {
    return 'This action adds a new dashboardSeller';
  }

  findAll() {
    return `This action returns all dashboardSeller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboardSeller`;
  }

  update(id: number, updateDashboardSellerDto: UpdateDashboardSellerDto) {
    return `This action updates a #${id} dashboardSeller`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboardSeller`;
  }
}
