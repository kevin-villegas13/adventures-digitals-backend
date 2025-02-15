import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { BillService } from './bill.service';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('confirm')
  async confirmPurchase(
    @Req() req: AuthenticatedRequest,
    @Body() createBillDto: CreateBillDto,
  ) {
    return this.billService.createBill(req, createBillDto);
  }

  @Post('payment/confirm/:billId')
  async confirmPayment(@Param('billId') billId: number) {
    return this.billService.confirmPayment(billId);
  }

  @Get(':id')
  async getBill(@Param('id') id: number) {
    return this.billService.getBillById(id);
  }

  @Get('user/:userId')
  async getUserBills(@Param('userId') userId: number) {
    return this.billService.getUserBills(userId);
  }
}
