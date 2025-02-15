import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';
import { CreateBillDto } from './dto/create-bill.dto';
import { Response } from 'src/common/response/type/response.type';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createBill(
    req: AuthenticatedRequest,
    createBillDto: CreateBillDto,
  ): Promise<Response<Bill>> {
    const user = await this.billRepository.findOne({
      where: { user: { id: req.user.id } },
      relations: ['user', 'user.paymentMethods'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (!user.paymentMethods || user.paymentMethods.length === 0)
      throw new BadRequestException(
        'Debe agregar un método de pago antes de confirmar la compra',
      );

    if (!createBillDto.details || createBillDto.details.length === 0)
      throw new BadRequestException(
        'La factura debe contener al menos un producto o servicio',
      );

    const bill = this.billRepository.create({
      user,
      date: new Date(),
      total: createBillDto.total,
      details: createBillDto.details,
      paymentMethods: user.paymentMethods,
    });

    const savedBill = await this.billRepository.save(bill);

    // Crear transacción asociada
    const transaction = this.transactionRepository.create({
      bill: savedBill,
      paymentMethod: user.paymentMethods[0],
      amount: createBillDto.total,
      status: 'PENDING',
    });

    await this.transactionRepository.save(transaction);

    return {
      status: true,
      message: 'Factura generada y transacción pendiente de confirmación',
      data: savedBill,
    };
  }

  async confirmPayment(billId: number): Promise<Response<null>> {
    const transaction = await this.transactionRepository.findOne({
      where: { bill: { id: billId } },
    });

    if (!transaction) throw new NotFoundException('Transacción no encontrada');

    transaction.status = 'APPROVED';
    await this.transactionRepository.save(transaction);

    return { status: true, message: 'Pago confirmado', data: null };
  }

  async getBillById(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOne({
      where: { id },
      relations: ['user', 'details', 'transactions'],
    });

    if (!bill) throw new NotFoundException('Factura no encontrada');

    return bill;
  }

  async getUserBills(userId: number): Promise<Bill[]> {
    return this.billRepository.find({
      where: { user: { id: userId } },
      relations: ['details', 'transactions'],
    });
  }
}
