import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authUserDto: AuthUserDto) {
    console.log('in2');
    const payload = authUserDto.username;

    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
