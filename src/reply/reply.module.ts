import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { CommentSchema } from 'src/comment/entities/comment.entity';
import { EmailModule } from 'src/email/email.module';

import { ReplySchema } from './entities/reply.entity';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'reply', schema: ReplySchema },
      { name: 'comment', schema: CommentSchema },
    ]),
    EmailModule,
  ],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'replies',
      method: RequestMethod.POST,
    });
  }
}
