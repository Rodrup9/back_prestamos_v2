import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { MunicipalityService } from 'src/municipality/municipality.service';
import { User } from 'src/users/entities/user.entity';
import { Municipality } from 'src/municipality/entities/municipality.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
    private readonly municipalityService: MunicipalityService,
  ) {}

  async create(createCityDto: CreateCityDto, userOrigin: User): Promise<City> {
    const { municipality, ...resCities } = createCityDto;

    const municipalityFound = await this.municipalityService.findOneById(municipality);

    const city = this.citiesRepository.create({
      ...resCities,
      municipality: municipalityFound,
      userCreated: userOrigin.iduser
    });

    return await this.citiesRepository.save(city);
  }

  findAll(): Promise<City[]> {
    return this.citiesRepository.find({
      where: {status: true}
    });
  }

  async findOneById(id: string): Promise<City> {
    const city = await this.citiesRepository.findOne({
      where: {status: true, idcity: id}
    });

    if (!city)
      throw new NotFoundException(`City with id ${id} not found`);

    return city;
  }

  private async adminFindOneById(id: string): Promise<City> {
    const city = await this.citiesRepository.findOne({
      where: {idcity: id},
      relations: {
        municipality: true
      }
    });

    if (!city)
      throw new NotFoundException(`City with id ${id} not found`);

    return city;
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    const city = await this.adminFindOneById(id);

    let municipality: Municipality = city.municipality;
    if (updateCityDto?.municipality && (updateCityDto?.municipality !== municipality.idmunicipality))
      municipality = await this.municipalityService.findOneById(id);

    const updatedCity = this.citiesRepository.create({
      ...city,
      ...updateCityDto,
      municipality
    });

    await this.citiesRepository.save(updatedCity);

    return 'City updated';
  }

  findByIdMunicipality(id: string): Promise<City[]> {
    return this.citiesRepository.find({
      where: { municipality: { idmunicipality: id, status: true }, status: true}
    })
  }

}
