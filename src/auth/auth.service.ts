import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from '../users/dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(authUserDto: AuthUserDto) {
    const payload = { username: authUserDto.username, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
