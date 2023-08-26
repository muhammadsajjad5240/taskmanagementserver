import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    this.configService.get<number>('DATA_BASE_URL');
    return 'Hello World!';
  }
}
