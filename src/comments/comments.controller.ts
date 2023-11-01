import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() data: CreateCommentDto) {
    return this.commentsService.create(data);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateCommentDto) {
    return this.commentsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
