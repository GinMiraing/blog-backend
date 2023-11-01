import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/comments/entities/comment.entity';

import { ReplySchema } from './entities/reply.entity';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'reply', schema: ReplySchema },
      { name: 'comment', schema: CommentSchema },
    ]),
  ],
  controllers: [RepliesController],
  providers: [RepliesService],
})
export class RepliesModule {}
