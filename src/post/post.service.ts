import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll() {
    const data = await this.postRepository.find({
      select: [
        'id',
        'title',
        'description',
        'create_at',
        'update_at',
        'category',
      ],
      where: {
        is_hidden: false,
      },
      order: {
        id: 'DESC',
      },
    });

    return data;
  }

  async findOneById(id: number) {
    const data = await this.postRepository.findOne({
      select: [
        'title',
        'description',
        'create_at',
        'update_at',
        'source_url',
        'category',
        'likes',
      ],
      where: {
        id,
        is_hidden: false,
      },
    });

    if (!data) {
      throw new NotFoundException('post not found');
    }

    return data;
  }

  async increaseLikesById(id: number) {
    const data = await this.postRepository.findOne({
      select: ['likes'],
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException('post not found');
    }

    await this.postRepository.increment({ id }, 'likes', 1);
  }
}
