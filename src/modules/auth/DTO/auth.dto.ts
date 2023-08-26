import {
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';


export class LogInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
