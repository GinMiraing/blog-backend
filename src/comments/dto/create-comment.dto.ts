import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  nick: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  link: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}
