import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { PaymentMethodsService } from './payment_methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto, @GetUser() user: User) {
    return this.paymentMethodsService.create(createPaymentMethodDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.paymentMethodsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentMethodsService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodsService.update(id, updatePaymentMethodDto);
  }

}
