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

import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesService } from './replies.service';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  async create(@Body() data: CreateReplyDto) {
    return this.repliesService.create(data);
  }

  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @Get()
  async findAll(@Query('parent_id') parent_id: number) {
    if (!parent_id) {
      return this.repliesService.findAll();
    } else {
      return this.repliesService.findAllByParentId(parent_id);
    }
  }

  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.repliesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateReplyDto,
    @Query('token') token: string,
  ) {
    if (token !== process.env.SECRET_KEY) {
      throw new UnauthorizedException('非法请求');
    }

    return this.repliesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Query('token') token: string) {
    if (token !== process.env.SECRET_KEY) {
      throw new UnauthorizedException('非法请求');
    }

    return this.repliesService.remove(id);
  }
}
