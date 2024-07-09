import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from 'src/auth/auth.dto';

@Injectable()
export class AuthService {
  login({ username, password }: AuthLoginDto) {
    if (username === 'user' && password === 'password')
      return {
        access_token: 'access_token',
      };

    throw new UnauthorizedException();
  }
}
