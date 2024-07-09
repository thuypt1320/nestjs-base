import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = this.extractsTokenFromHeader(request);
    if (!token) throw new ForbiddenException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JwtConstants.secret,
      });
      request['user'] = payload;
    } catch (e) {
      throw new ForbiddenException();
    }

    return true;
  }

  extractsTokenFromHeader(request) {
    const [type, token] = request.headers.authorization.split(' ') || '';
    return type === 'Bearer' ? token : undefined;
  }
}
