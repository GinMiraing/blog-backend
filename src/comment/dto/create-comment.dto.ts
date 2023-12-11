import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  nick: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}
