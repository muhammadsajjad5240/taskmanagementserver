import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hello-world')
  async hello() {
    return 'hello world';
  }
}
