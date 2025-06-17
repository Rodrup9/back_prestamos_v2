import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MunicipalityModule } from 'src/municipality/municipality.module';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
  imports: [
    TypeOrmModule.forFeature([City]),
    AuthModule,
    MunicipalityModule
  ],
  exports: [CitiesService]
})
export class CitiesModule {}
