import {
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  Matches,
} from 'class-validator';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../constants/constants';


export class CreateUserDto {
  @IsString()
  @IsEmail(undefined, { message: 'Email is invalid.' })
  readonly email: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, { message: 'Password is to short.' })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: 'Password is to long.' })
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,20}$/, {
    message: 'Password must be at least 1 character and one letter.',
  })
  password: string;

}
