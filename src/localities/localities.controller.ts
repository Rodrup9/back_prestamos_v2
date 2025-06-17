import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('localities')
export class LocalitiesController {
  constructor(private readonly localitiesService: LocalitiesService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createLocalityDto: CreateLocalityDto, @GetUser() user: User) {
    return {error: false, response: await this.localitiesService.create(createLocalityDto, user)};
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return {error: false, response: await this.localitiesService.findAll()};
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string) {
    return {error: false, response: await this.localitiesService.findOneById(id)};
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() updateLocalityDto: UpdateLocalityDto) {
    return {error: false, response: await this.localitiesService.update(id, updateLocalityDto)};
  }

}
