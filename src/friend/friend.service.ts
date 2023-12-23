import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
  ) {}

  async findAll() {
    const data = await this.friendRepository.find({
      select: ['name', 'avatar', 'category', 'description', 'link'],
      where: {
        is_hidden: false,
      },
      order: {
        sorting: 'DESC',
      },
    });

    return data;
  }
}
