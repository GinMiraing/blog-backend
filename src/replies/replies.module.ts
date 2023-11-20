import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { CommentSchema } from 'src/comments/entities/comment.entity';
import { EmailModule } from 'src/email/email.module';

import { ReplySchema } from './entities/reply.entity';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'reply', schema: ReplySchema },
      { name: 'comment', schema: CommentSchema },
    ]),
    EmailModule,
  ],
  controllers: [RepliesController],
  providers: [RepliesService],
})
export class RepliesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'replies',
      method: RequestMethod.POST,
    });
  }
}
