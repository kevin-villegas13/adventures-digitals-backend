import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardSellerService } from './dashboard-seller.service';
import { CreateDashboardSellerDto } from './dto/create-dashboard-seller.dto';
import { UpdateDashboardSellerDto } from './dto/update-dashboard-seller.dto';

@Controller('dashboard-seller')
export class DashboardSellerController {
  constructor(private readonly dashboardSellerService: DashboardSellerService) {}

  @Post()
  create(@Body() createDashboardSellerDto: CreateDashboardSellerDto) {
    return this.dashboardSellerService.create(createDashboardSellerDto);
  }

  @Get()
  findAll() {
    return this.dashboardSellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardSellerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardSellerDto: UpdateDashboardSellerDto) {
    return this.dashboardSellerService.update(+id, updateDashboardSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardSellerService.remove(+id);
  }
}
