import { Controller, Get } from '@nestjs/common';

import { FriendService } from './friend.service';

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  async findAll() {
    const data = await this.friendService.findAll();

    return {
      message: 'get friends success',
      data,
    };
  }
}
