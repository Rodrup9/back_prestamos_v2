import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment_methods.service';
import { PaymentMethodsController } from './payment_methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment_method.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  imports: [
    TypeOrmModule.forFeature([PaymentMethod]),
    AuthModule
  ],
  exports: [PaymentMethodsService]
})
export class PaymentMethodsModule {}
