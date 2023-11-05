import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsModule } from './comments/comments.module';

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
    CommentsModule,
  ],
})
export class AppModule {}
