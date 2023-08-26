import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { User } from './user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async create(
    @Body()
    payload: CreateUserDto,
  ): Promise<User> {
    const response = await this.userService.create(payload);
    return response;
  }

}
