import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { ConfigService } from '../../config/config.service';
import { TokenService } from '../tokens/token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    @Inject(forwardRef(() => JwtService))
    @Inject(forwardRef(() => TokenService))
    @Inject(forwardRef(() => ConfigService))
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {}

  async login(payload: any): Promise<any> {
    let user = null;

    if (payload?.email) {
      user = await this.userService.findOneByQuery({
        email: payload.email,
      });
    } else {
      throw new UnauthorizedException('Incorrect email');
    }

    if (user && user?.isActive === false) {
      user = undefined;
    }

    if (!user) user = undefined;

    let isMatch = false;

    try {
      isMatch = await user.checkPassword(payload.password);
    } catch (error) {
      return undefined;
    }

    if (isMatch) {
      const { accessToken, refreshToken } = await this.createJwt(user);

      const result = {
        user,
        tokens: {
          accessToken,
          refreshToken,
        },
      };

      return result;
    } else {
      throw new UnauthorizedException('Incorrect Passsword');
    }
  }

  async generateToken(userId, expires, type) {
    const secret = this.configService.jwtSecret;
    const data = {
      sub: userId,
      type: type,
    };

    const token = await this.jwtService.sign(data, {
      secret: secret,
      expiresIn: expires,
    });
    await this.tokenService.create({
      token,
      user: userId,
      type: type,
      expiredAt: expires,
      blacklisted: false,
    });
    return token;
  }

  async createJwt(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessExipiresIn = this.configService.jwtExpiresIn;
    const refreshExipiresIn = this.configService.jwtRefreshExpiresIn;

    if (!accessExipiresIn) {
      throw new HttpException(
        'Access token expires not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!refreshExipiresIn) {
      throw new HttpException(
        'Refresh token expires not exist.',
        HttpStatus.NOT_FOUND,
      );
    }

    const accessToken = await this.generateToken(
      user._id,
      accessExipiresIn,
      'access',
    );
    const refreshToken = await this.generateToken(
      user._id,
      refreshExipiresIn,
      'refresh',
    );

    return {
      accessToken,
      refreshToken,
    };
  }

}
