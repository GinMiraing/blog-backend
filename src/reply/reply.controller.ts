import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CreateReplyDto } from './dto/create-reply.dto';
import { ReplyService } from './reply.service';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  async create(@Body() data: CreateReplyDto) {
    return await this.replyService.create(data);
  }

  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @Get()
  async findByParentId(@Query('parent_id') parent_id: number) {
    if (!parent_id) {
      throw new BadRequestException('parent_id 错误');
    }

    return await this.findByParentId(parent_id);
  }
}
