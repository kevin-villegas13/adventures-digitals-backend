import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardSellerDto } from './create-dashboard-seller.dto';

export class UpdateDashboardSellerDto extends PartialType(CreateDashboardSellerDto) {}
