import {  IsString, IsNotEmpty, IsIn } from 'class-validator';


export class TaskDto {

  @IsString()
  @IsNotEmpty()
  name: string;
}
