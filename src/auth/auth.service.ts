import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findOneByEmail(email);
  
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valids');
    return {
      ...user,
      token: this.getJwtToken({iduser: user.iduser})
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }


  async checkAuthStatus(user: User) {
    return {
      ...user,
      token:  this.getJwtToken({iduser: user.iduser})
    }
  }
}
