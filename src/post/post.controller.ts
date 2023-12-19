import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('category') category: string,
  ) {
    const data = await this.postService.findAll({
      page,
      limit: limit || 10,
      category,
    });

    return {
      message: 'get posts success',
      data,
    };
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id');
    }

    const data = await this.postService.findOneById(id);

    return {
      message: 'get post success',
      data,
    };
  }

  @Post(':id/likes')
  async increaseLikesById(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('invalid id');
    }

    await this.postService.increaseLikesById(id);

    return {
      message: 'increase post likes success',
      data: null,
    };
  }
}
