import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';

@Module({
  controllers: [LoansController],
  providers: [LoansService],
  imports: [
    TypeOrmModule.forFeature([Loan])
  ],
  exports: [ LoansService]
})
export class LoansModule {}
