import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthLoginDto } from 'src/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() data: AuthLoginDto) {
    return this.authService.login(data);
  }

  @Patch('/verify')
  verify(@Body() body) {
    return this.authService.verify(body);
  }

  @Get('/verify')
  async getVerify(@Query() query, @Res() response) {
    const res = await this.verify(query);
    if (res === 'success')
      return response.redirect(
        'http://localhost:3001/api/swagger#/Auth/AuthSignUp',
      );
  }
}
