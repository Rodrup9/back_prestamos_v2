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
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod' ? true : false,
      extra: {
        ssl: process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true
    }),
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

// console.log(process.env.DB_PASSWORD,
//   process.env.DB_USER,
//   process.env.DB_NAME,
//   process.env.DB_HOST,
//   process.env.DB_PORT,
//   process.env.STAGE
// )