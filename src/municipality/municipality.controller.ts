import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createMunicipalityDto: CreateMunicipalityDto, @GetUser() user: User) {
    return {error: false, response: await this.municipalityService.create(createMunicipalityDto, user)};
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return {error: false, response: await this.municipalityService.findAll()};
  }

  @Get('byState/:id')
  @UseGuards(AuthGuard())
  async findByIdState(@Param('id', ParseUUIDPipe) id: string) {
    return {error: false, response: await this.municipalityService.findByIdState(id)};
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {error: false, response: await this.municipalityService.findOneById(id)};
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMunicipalityDto: UpdateMunicipalityDto) {
    return {erorr: false, response: await this.municipalityService.update(id, updateMunicipalityDto)};
  }


}
