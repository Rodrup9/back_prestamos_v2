import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsController } from './directions.controller';
import { Direction } from './entities/direction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LocalitiesModule } from 'src/localities/localities.module';

@Module({
  controllers: [DirectionsController],
  providers: [DirectionsService],
  imports: [
    TypeOrmModule.forFeature([Direction]),
    AuthModule,
    LocalitiesModule
  ],
  exports: [DirectionsService]
})
export class DirectionsModule {}
