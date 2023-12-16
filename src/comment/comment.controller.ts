import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() data: CreateCommentDto) {
    await this.commentService.create(data);
    return {
      message: 'create comment success',
      data: null,
    };
  }

  @Get()
  async findByPath(@Query('path') path: string) {
    if (!path) {
      throw new BadRequestException('invalid path');
    }

    const data = await this.commentService.findByPath(path);

    return {
      message: 'get comments success',
      data,
    };
  }

  @Get(':parent_id')
  async findByParentId(@Param('parent_id') parent_id: number) {
    if (!parent_id) {
      throw new BadRequestException('invalid parent_id');
    }

    const data = await this.commentService.findByParentId(parent_id);

    return {
      message: 'get comments success',
      data,
    };
  }
}
