import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment_method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository : Repository<PaymentMethod>
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto, userOrigin: User): Promise<PaymentMethod> {
    const paymentMethod = this.paymentMethodRepository.create({
      ...createPaymentMethodDto,
      userCreated: userOrigin.iduser
    });

    return await this.paymentMethodRepository.save(paymentMethod);
  }

  findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find({
      where: {status: true}
    });
  }

  adminFindAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find();
  }

  async findOneById(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { status: true, idpayment_method: id }
    });

    if (!paymentMethod)
      throw new NotFoundException(`Payment Method with id ${id} not found`);

    return paymentMethod;
  }

  private async adminFindOneById(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOneBy({idpayment_method: id});

    if (!paymentMethod)
      throw new NotFoundException(`Payment Method with id ${id} not found`);

    return paymentMethod;
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<string> {
    const paymentMethod = await this.adminFindOneById(id);

    const updatedPaymentMethod = this.paymentMethodRepository.create({
      ...paymentMethod,
      ...updatePaymentMethodDto
    });

    await this.paymentMethodRepository.save(updatedPaymentMethod);

    return 'Payment Method updated';
  }


}
