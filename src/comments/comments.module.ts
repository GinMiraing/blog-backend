import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentSchema } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
