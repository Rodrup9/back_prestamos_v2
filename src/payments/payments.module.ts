import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PaymentMethodsModule } from 'src/payment_methods/payment_methods.module';
import { LoansModule } from 'src/loans/loans.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    TypeOrmModule.forFeature([Payment]),
    AuthModule,
    PaymentMethodsModule,
    LoansModule
  ],
  exports: [PaymentsService]
})
export class PaymentsModule {}
