import { Module } from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { LocalitiesController } from './localities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locality } from './entities/locality.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  controllers: [LocalitiesController],
  providers: [LocalitiesService],
  imports: [
    TypeOrmModule.forFeature([Locality]),
    AuthModule,
    CitiesModule
  ],
  exports: [LocalitiesService]
})
export class LocalitiesModule {}
