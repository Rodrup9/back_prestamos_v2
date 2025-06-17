import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('States')
@ApiBearerAuth()
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createStateDto: CreateStateDto, @GetUser() user: User) {
    return {error: false, response: await this.statesService.create(createStateDto, user)};
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return {error: false, response: await this.statesService.findAll()};
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {error: false, response: await this.statesService.findOneById(id)};
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStateDto: UpdateStateDto) {
    return {error: false, response: await this.statesService.update(id, updateStateDto)};
  }

}
