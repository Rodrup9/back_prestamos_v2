import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Locality } from './entities/locality.entity';
import { Repository } from 'typeorm';
import { CitiesService } from 'src/cities/cities.service';
import { User } from 'src/users/entities/user.entity';
import { City } from 'src/cities/entities/city.entity';
import { ChainCreateLocalityDto } from './dto/chain-create-locality.dto';
import { ChainUpdateDirectionDto } from '../directions/dto/chain-update-direction.dto';
import { ChainUpdateLocalityDto } from './dto';

@Injectable()
export class LocalitiesService {
  constructor(
    @InjectRepository(Locality)
    private readonly localityRepository: Repository<Locality>,
    private readonly citiesService: CitiesService,
  ) {}

  async chainCreate(chainCreateLocalityDto: ChainCreateLocalityDto, userOrigin: User): Promise<Locality> {
    if (chainCreateLocalityDto?.locality)
      return await this.findOneById(chainCreateLocalityDto.locality);
      
    if (chainCreateLocalityDto?.city && chainCreateLocalityDto?.name)
      return await this.create(chainCreateLocalityDto, userOrigin);

    throw new BadRequestException('Bad request');
  }

  async create(createLocalityDto: CreateLocalityDto, userOrigin: User): Promise<Locality> {
    const { city, ...resLocality } = createLocalityDto;

    const cityFound = await this.citiesService.findOneById(city);

    const locality = this.localityRepository.create({
      ...resLocality,
      city: cityFound,
      userCreated: userOrigin.iduser
    });

    return await this.localityRepository.save(locality);
  }

  findAll(): Promise<Locality[]> {
    return this.localityRepository.find({
      where: {status: true}
    });
  }

  async findOneById(id: string): Promise<Locality> {
    const locality = await this.localityRepository.findOne({
      where: {idlocality: id, status: true}
    });

    if (!locality)
      throw new NotFoundException(`Locality with id ${id} not found`);

    return locality;
  }

  private async adminFindOneById(id: string): Promise<Locality> {
    const locality = await this.localityRepository.findOne({
      where: {idlocality: id},
      relations: {
        city: true
      }
    });

    if (!locality)
      throw new NotFoundException(`Locality with id ${id} not found`);

    return locality;
  }

  async update(id: string, updateLocalityDto: UpdateLocalityDto): Promise<string> {
    const locality = await this.adminFindOneById(id);

    let city: City = locality.city;
    if (updateLocalityDto?.city && (updateLocalityDto?.city !== city.idcity))
      city = await this.citiesService.findOneById(updateLocalityDto.city);

    const updatedLocality = this.localityRepository.create({
      ...locality,
      ...updateLocalityDto,
      city
    });

    await this.localityRepository.save(updatedLocality);

    return 'Locality updated';
  }

  async chainUpdate(chainUpdateLocalityDto: ChainUpdateLocalityDto, localityCur: Locality, userOrigin: User) {
    if (chainUpdateLocalityDto?.locality)
      return await this.findOneById(chainUpdateLocalityDto.locality);
      
    if (chainUpdateLocalityDto?.city && chainUpdateLocalityDto?.name)
      return await this.create({
        city: chainUpdateLocalityDto.city,
        name: chainUpdateLocalityDto.name
      }, userOrigin);

    throw new BadRequestException('Bad request');
  }

  findByIdCity(id: string): Promise<Locality[]> {
    return this.localityRepository.find({
      where: { city: { idcity: id, status: true }, status: true}
    })
  }

}
