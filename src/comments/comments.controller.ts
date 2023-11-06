import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

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

  @Get()
  async findAll(@Query('path') path: string, @Query('admin') admin: number) {
    if (admin) {
      return await this.commentsService.adminUpdate();
    }

    if (path) {
      return await this.commentsService.findAllByPath(path);
    } else {
      return await this.commentsService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateCommentDto) {
    return this.commentsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
