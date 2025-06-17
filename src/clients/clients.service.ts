import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { DirectionsService } from 'src/directions/directions.service';
import { User } from 'src/users/entities/user.entity';
import { Direction } from 'src/directions/entities/direction.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly userService: UsersService,
    private readonly directionService: DirectionsService,
  ) {}

  async create(createClientDto: CreateClientDto, userOrigin: User): Promise<Client> {
    const { lender, direction, ...resClient } = createClientDto;

    const [lenderFound, directionCreate]: [User, Direction] = await Promise.all([
      this.userService.findOneByUuid(lender),
      this.directionService.chainCreate(direction, userOrigin)
    ])

    const client = this.clientRepository.create({
      ...resClient,
      lender: lenderFound,
      userCreated: userOrigin.iduser,
      direction: directionCreate 
    });

    return await this.clientRepository.save(client);
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      where: {status: true}
    });
  }

  async findOneById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: {idclient: id, status: true}
    });

    if (!client)
      throw new NotFoundException(`Client with id ${id} not found`);

    return client;
  }

  private async adminFindOneById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: {idclient: id},
      relations: {
        direction: {
          locality: {
            city: true
          }
        }
      }
    });

    if (!client)
      throw new NotFoundException(`Client with id ${id} not found`);

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, userOrigin: User) {
    const client = await this.adminFindOneById(id);

    const [lender, direction]: [User, Direction] = await Promise.all([
      (updateClientDto?.lender && (updateClientDto?.lender !== client.lender.iduser)) 
        ? this.userService.findOneByUuid(updateClientDto.lender) 
        : client.lender,
      (updateClientDto?.direction) 
        ? this.directionService.chainUpdate(updateClientDto.direction, client.direction, userOrigin)
        : client.direction
    ]);

    const updatedClient = this.clientRepository.create({
      ...client,
      ...updateClientDto,
      lender,
      direction
    });

    await this.clientRepository.save(updatedClient);

    return 'Client updated';
  }

}
