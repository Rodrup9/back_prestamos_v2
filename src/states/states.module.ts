import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [StatesController],
  providers: [StatesService],
  imports: [
    TypeOrmModule.forFeature([State]),
    AuthModule
  ],
  exports: [StatesService]
})
export class StatesModule {}
