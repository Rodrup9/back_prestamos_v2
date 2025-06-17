import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { StatesModule } from 'src/states/states.module';

@Module({
  controllers: [MunicipalityController],
  providers: [MunicipalityService],
  imports: [
    TypeOrmModule.forFeature([Municipality]),
    StatesModule
  ],
  exports: [MunicipalityService]
})
export class MunicipalityModule {}
