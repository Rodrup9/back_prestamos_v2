import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUserDefault() {

    const user = this.userRepository.create({
      email: 'root@gmail.com',
      name: 'root',
      password: bcrypt.hashSync('rootAdmin34', +this.configService.get('SALT')),
      userCreated: '21ab81c5-8463-4298-a925-4344ca63d03e'
    });

    await this.userRepository.save(user);
    return user;
  }

}
