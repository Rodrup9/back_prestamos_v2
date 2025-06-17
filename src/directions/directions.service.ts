import { Injectable } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direction } from './entities/direction.entity';
import { Repository } from 'typeorm';
import { LocalitiesService } from 'src/localities/localities.service';
import { ChainCreateDirectionDto } from './dto/chain-create-direction.dto';
import { User } from 'src/users/entities/user.entity';
import { ChainUpdateDirectionDto } from './dto/chain-update-direction.dto';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
    private readonly localitiesService: LocalitiesService,
  ) {}

  async chainCreate(chainCreateDirectionDto: ChainCreateDirectionDto, userOrigin: User) : Promise<Direction>{
    const { locality, ...resDirection } = chainCreateDirectionDto;
    
    const locationFound = await this.localitiesService.chainCreate(locality, userOrigin);

    return this.directionRepository.create({
      ...resDirection,
      locality: locationFound,
      userCreated: userOrigin.iduser
    });
  }

  create(createDirectionDto: CreateDirectionDto) {
    return 'This action adds a new direction';
  }

  findAll() {
    return `This action returns all directions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} direction`;
  }

  update(id: number, updateDirectionDto: UpdateDirectionDto) {
    return `This action updates a #${id} direction`;
  }

  async chainUpdate(chainUpdateDirectionDto: ChainUpdateDirectionDto, directionCur: Direction, userOrigin: User): Promise<Direction> {
    
    return this.directionRepository.create({
      ...directionCur,
      ...UpdateDirectionDto,
      locality: (chainUpdateDirectionDto?.locality && (chainUpdateDirectionDto?.locality?.locality !== directionCur.locality.idlocality))
        ? await this.localitiesService.chainUpdate(chainUpdateDirectionDto.locality, directionCur.locality, userOrigin)
        : directionCur.locality
    });
  }

  remove(id: number) {
    return `This action removes a #${id} direction`;
  }
}
