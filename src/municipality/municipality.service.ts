import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Repository } from 'typeorm';
import { StatesService } from 'src/states/states.service';
import { User } from 'src/users/entities/user.entity';
import { State } from 'src/states/entities/state.entity';

@Injectable()
export class MunicipalityService {
  constructor(
    @InjectRepository(Municipality)
    private readonly municipalityRepository: Repository<Municipality>,
    private readonly stateService: StatesService,
  ) {}
  
  async create(createMunicipalityDto: CreateMunicipalityDto, userOrigin: User): Promise<Municipality> {
    const { state, ...resMunicipality } = createMunicipalityDto;

   const stateFound = await this.stateService.findOneById(state);

   const municipality = this.municipalityRepository.create({
    ...resMunicipality,
    state: stateFound,
    userCreated: userOrigin.iduser
   });

   return this.municipalityRepository.save(municipality);
  }

  findAll(): Promise<Municipality[]> {
    return this.municipalityRepository.find({
      where: {status: true}
    });
  }

  async findOneById(id: string): Promise<Municipality> {
    const municipality = await this.municipalityRepository.findOne({
      where: {idmunicipality: id, status: true}
    });

    if (!municipality)
      throw new NotFoundException(`Municipality with id ${id} not found`);

    return municipality;
  }

  private async adminFindOneById(id: string): Promise<Municipality> {
    const municipality = await this.municipalityRepository.findOne({
      where: {idmunicipality: id},
      relations: {
        state: true
      }
    });

    if (!municipality)
      throw new NotFoundException(`Municipality with id ${id} not found`);

    return municipality;
  }

  async update(id: string, updateMunicipalityDto: UpdateMunicipalityDto): Promise<string> {
    const municipality = await this.findOneById(id);

    let state: State = municipality.state;
    if (updateMunicipalityDto?.state && (updateMunicipalityDto?.state !== state.idstate))
      state = await this.stateService.findOneById(updateMunicipalityDto.state);

    const updatedMunicipality = this.municipalityRepository.create({
      ...municipality,
      ...updateMunicipalityDto,
      state
    });

    await this.municipalityRepository.save(updatedMunicipality);

    return 'Municipality updated';
  }

  findByIdState(id: string): Promise<Municipality[]> {
    return this.municipalityRepository.find({
      where: { state: { idstate: id, status: true }, status: true }
    })
  }
}
