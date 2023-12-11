import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { EmailModule } from './email/email.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      {
        user: process.env.MONGODB_USER || 'nest',
        pass: process.env.MONGODB_PASSWORD || '123456',
        dbName: process.env.MONGODB_DATABASE || 'nestjs',
        authSource: 'admin',
      },
    ),
    ThrottlerModule.forRoot([
      {
        ttl: 600000,
        limit: 5,
      },
    ]),
    CommentModule,
    ReplyModule,
    AuthModule,
    EmailModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
