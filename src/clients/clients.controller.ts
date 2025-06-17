import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createClientDto: CreateClientDto, @GetUser() user: User) {
    return this.clientsService.create(createClientDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateClientDto: UpdateClientDto, @GetUser() user: User) {
    return this.clientsService.update(id, updateClientDto, user);
  }


}
