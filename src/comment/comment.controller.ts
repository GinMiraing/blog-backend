import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() data: CreateCommentDto) {
    return await this.commentService.create(data);
  }

  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @Get()
  async findByPath(@Query('path') path: string) {
    if (!path) {
      throw new BadRequestException('path 错误');
    }

    return await this.commentService.findByPath(path);
  }
}
