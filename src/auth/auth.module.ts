import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/auth/constants';

@Module({
  imports: [JwtModule.register({ global: true, secret: JwtConstants.secret })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
