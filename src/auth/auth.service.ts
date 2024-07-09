import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDto } from 'src/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(payload: AuthLoginDto) {
    const { username, password } = payload;
    if (username === 'user' && password === 'password')
      return {
        access_token: await this.jwtService.signAsync(payload),
      };

    throw new UnauthorizedException();
  }

  async verify(payload) {
    if (payload.token !== '--') throw new BadRequestException();
    return 'success';
  }
}
