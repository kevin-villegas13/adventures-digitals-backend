import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardBuyerDto } from './create-dashboard-buyer.dto';

export class UpdateDashboardBuyerDto extends PartialType(CreateDashboardBuyerDto) {}
