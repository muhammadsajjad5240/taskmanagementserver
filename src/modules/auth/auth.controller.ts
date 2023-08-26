import { Body, Controller, Get, Post, UseGuards,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LogInDto,
} from './DTO/auth.dto';
import { AuthGuard } from './guards/auth.guard';
@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async create(
    @Body()
    payload: LogInDto,
  ): Promise<any> {
    const response = await this.authService.login(payload);
    return response;
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async changePassword(
    @Req() request: Request,
  ): Promise<any> {
    return  request['user']
  }
}


