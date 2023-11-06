import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() data: CreateCommentDto) {
    return this.commentsService.create(data);
  }

  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @Get()
  async findAll(@Query('path') path: string) {
    if (path) {
      return await this.commentsService.findAllByPath(path);
    } else {
      return await this.commentsService.findAll();
    }
  }

  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateCommentDto,
    @Query('token') token: string,
  ) {
    if (token !== process.env.SECRET_KEY) {
      throw new UnauthorizedException('非法请求');
    }

    return this.commentsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Query('token') token: string) {
    if (token !== process.env.SECRET_KEY) {
      throw new UnauthorizedException('非法请求');
    }

    return this.commentsService.remove(id);
  }
}
