import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { LoansService } from 'src/loans/loans.service';
import { PaymentMethodsService } from 'src/payment_methods/payment_methods.service';
import { User } from 'src/users/entities/user.entity';
import { Loan } from 'src/loans/entities/loan.entity';
import { PaymentMethod } from 'src/payment_methods/entities/payment_method.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly loanService: LoansService,
    private readonly paymnetMethodService: PaymentMethodsService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, userOrigin: User): Promise<Payment> {
    const { loan, payment_method, ...resPayment } = createPaymentDto;
    const [loanFound, paymentMethodFound]: [Loan, PaymentMethod] = await Promise.all([
      this.loanService.findOneById(loan),
      this.paymnetMethodService.findOneById(payment_method)
    ]);

    const payment = this.paymentRepository.create({
      ...resPayment,
      loan: loanFound,
      payment_method: paymentMethodFound,
      userCreated: userOrigin.iduser
    });

    return await this.paymentRepository.save(payment);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: {status: true},
      relations: {
        payment_method: true,
        loan: true
      }
    });
  }

  adminFindAll(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: {
        loan: true,
        payment_method: true
      }
    });
  }

  async findOneById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { status: true, idpayment: id }
    });

    if (!payment)
      throw new NotFoundException(`Payment with id ${id} not found`);

    return payment;
  }

  async adminFindOneById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { idpayment: id }
    });

    if (!payment)
      throw new NotFoundException(`Payment with id ${id} not found`);

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<string> {
   const payment = await this.adminFindOneById(id);

    const [loanFound, paymentMethodFound]: [Loan, PaymentMethod] = await Promise.all([
      (updatePaymentDto?.loan && (updatePaymentDto?.loan != payment.loan.idloan)) 
        ? this.loanService.findOneById(updatePaymentDto.loan)
        : payment.loan,
      (updatePaymentDto?.payment_method && (updatePaymentDto?.payment_method != payment.payment_method.idpayment_method))
        ? this.paymnetMethodService.findOneById(updatePaymentDto.payment_method)
        : payment.payment_method
    ]);

    const updatedPayment = this.paymentRepository.create({
      ...payment,
      ...updatePaymentDto,
      loan: loanFound,
      payment_method: paymentMethodFound
    });

    await this.paymentRepository.save(updatedPayment);

    return 'Payment updated';
  }

}
