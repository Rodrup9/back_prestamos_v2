import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>
  ) {}

  async create(createStateDto: CreateStateDto, userOrigin: User): Promise<State> {
    const state = this.stateRepository.create({
      ...createStateDto,
      userCreated: userOrigin.iduser
    });

    return await this.stateRepository.save(state);
  }

  findAll(): Promise<State[]> {
    return this.stateRepository.find({
      where: { status: true }
    });
  }

  async findOneById(id: string): Promise<State> {
    const state = await this.stateRepository.findOne({
      where: { status: true, idstate: id}
    });

    if (!state)
      throw new NotFoundException(`State with id ${id} not found`);

    return state;
  }

  async update(id: string, updateStateDto: UpdateStateDto): Promise<string> {
    const state = await this.findOneById(id);

    const updatedState = this.stateRepository.create({
      ...state,
      ...updateStateDto
    });

    await this.stateRepository.save(updatedState);

    return `States updated`;
  }

}
