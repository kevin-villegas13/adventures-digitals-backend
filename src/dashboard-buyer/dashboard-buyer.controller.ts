import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardBuyerService } from './dashboard-buyer.service';
import { CreateDashboardBuyerDto } from './dto/create-dashboard-buyer.dto';
import { UpdateDashboardBuyerDto } from './dto/update-dashboard-buyer.dto';

@Controller('dashboard-buyer')
export class DashboardBuyerController {
  constructor(private readonly dashboardBuyerService: DashboardBuyerService) {}

  @Post()
  create(@Body() createDashboardBuyerDto: CreateDashboardBuyerDto) {
    return this.dashboardBuyerService.create(createDashboardBuyerDto);
  }

  @Get()
  findAll() {
    return this.dashboardBuyerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardBuyerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardBuyerDto: UpdateDashboardBuyerDto) {
    return this.dashboardBuyerService.update(+id, updateDashboardBuyerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardBuyerService.remove(+id);
  }
}
