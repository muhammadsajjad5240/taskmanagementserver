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
import { ObjectId } from 'mongodb';

import { ConfigService } from '../../../config/config.service';
import { TokenService } from '../../tokens/token.service';

@Injectable()
export class VerifyEmailGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.jwtSecret,
      });
      const isTokenExist = await this.tokenService.findOneByQuery({
        token: token,
        user: new ObjectId(payload.sub),
        blacklisted: false,
      });
      if (!isTokenExist) {
        throw new UnauthorizedException('Token Expired. Try again later.');
      }
    } catch (err) {
      throw new HttpException(
        err?.message === 'jwt expired'
          ? 'Token expired try again.'
          : 'Token Expired. Try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): {
    token: any;
  } {
    const token = request.query?.token;
    return { token };
  }
}
