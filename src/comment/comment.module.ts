import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/auth/auth.middleware';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comments', method: RequestMethod.POST });
  }
}
