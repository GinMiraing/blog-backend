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

import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesService } from './replies.service';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  create(@Body() data: CreateReplyDto) {
    return this.repliesService.create(data);
  }

  @Get()
  findAll(@Query('parent_id') parent_id: number) {
    if (!parent_id) {
      return this.repliesService.findAll();
    } else {
      return this.repliesService.findAllByParentId(parent_id);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.repliesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateReplyDto) {
    return this.repliesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.repliesService.remove(id);
  }
}
