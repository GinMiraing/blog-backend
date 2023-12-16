import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCommentDto {
  @IsBoolean()
  is_reply: boolean;

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
  @IsOptional()
  path: string;

  @IsNumber()
  @IsOptional()
  parent_id: number;

  @IsNumber()
  @IsOptional()
  reply_id: number;

  @IsString()
  @IsOptional()
  reply_nick: string;
}
