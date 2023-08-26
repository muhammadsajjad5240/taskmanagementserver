import { Controller, Post } from '@nestjs/common';

import { TokenDto } from './token.dto';
import { Token } from './token.schema';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/')
  async create(payload: TokenDto): Promise<Token> {
    const response = await this.tokenService.create(payload);
    return response;
  }
}
