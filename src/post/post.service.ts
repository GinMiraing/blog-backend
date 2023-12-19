import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';

import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll({
    page,
    limit,
    category,
  }: {
    page?: number;
    limit: number;
    category?: string;
  }) {
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
        category,
      },
      order: {
        id: 'DESC',
      },
      take: limit,
      skip: page ? (page - 1) * limit : 0,
    });

    const total = await this.postRepository.count();

    return { posts: data, total };
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
