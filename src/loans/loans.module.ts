import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  controllers: [LoansController],
  providers: [LoansService],
  imports: [
    TypeOrmModule.forFeature([Loan]),
    ClientsModule,
    UsersModule,
    AuthModule
  ],
  exports: [ LoansService]
})
export class LoansModule {}
