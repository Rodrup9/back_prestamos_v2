import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StatesModule } from './states/states.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { CitiesModule } from './cities/cities.module';
import { LocalitiesModule } from './localities/localities.module';
import { DirectionsModule } from './directions/directions.module';
import { ClientsModule } from './clients/clients.module';
import { LoansModule } from './loans/loans.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentMethodsModule } from './payment_methods/payment_methods.module';
import { ContractsModule } from './contracts/contracts.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    StatesModule,
    MunicipalityModule,
    CitiesModule,
    LocalitiesModule,
    DirectionsModule,
    ClientsModule,
    LoansModule,
    PaymentsModule,
    PaymentMethodsModule,
    ContractsModule,
    SeedModule,
  ]
})
export class AppModule {}
