import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '../../../config/config.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class ResetPassswordGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.jwtSecret,
      });

      const userData = await this.userService.findOneByID(payload.sub);

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = userData;
    } catch (err) {
      throw new HttpException(
        err?.message === 'jwt expired'
          ? 'Token expired try again.'
          : 'Tye again',
        HttpStatus.BAD_REQUEST,
      );
      // throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.body.resetPasswordToken?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
