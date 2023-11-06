import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReplyDto {
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

  @IsNumber()
  @IsNotEmpty()
  parent_id: number;

  @IsNumber()
  @IsNotEmpty()
  reply_id: number;
}
