import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createCityDto: CreateCityDto, @GetUser() user: User) {
    return {errpr: false, response: await this.citiesService.create(createCityDto, user)};
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return {errpr: false, response: await this.citiesService.findAll()};
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string) {
    return {errpr: false, response: await this.citiesService.findOneById(id)};
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return {errpr: false, response: await this.citiesService.update(id, updateCityDto)};
  }

}
