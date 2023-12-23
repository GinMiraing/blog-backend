import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { EmailModule } from './email/email.module';
import { Friend } from './friend/entities/friend.entity';
import { FriendModule } from './friend/friend.module';
import { Post } from './post/entities/post.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT || 3306),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'default',
      entities: [Comment, Post, Friend],
      synchronize: false,
    }),
    CommentModule,
    EmailModule,
    PostModule,
    FriendModule,
  ],
})
export class AppModule {}
