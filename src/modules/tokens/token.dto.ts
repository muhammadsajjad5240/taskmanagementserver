import { IsBoolean, IsString, IsNotEmpty, IsDateString } from 'class-validator';

import { ToBoolean } from '../../utils/common';

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  expiredAt: string;

  @IsBoolean()
  @ToBoolean()
  blacklisted;
}
