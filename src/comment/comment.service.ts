import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MD5 } from 'crypto-js';
import { Model } from 'mongoose';

import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectModel('comment') private commentModel: Model<Comment>) {}

  async create(data: CreateCommentDto) {
    const { nick, email, link, content, path } = data;

    const createdComment = new this.commentModel({
      nick,
      email,
      email_md5: MD5(email).toString(),
      link,
      content,
      is_admin: link === 'https://blog.zengjunyin.com',
      path,
    });

    return createdComment.save();
  }

  async findByPath(path: string) {
    return await this.commentModel
      .find({ path })
      .select([
        '_id',
        'nick',
        'email_md5',
        'link',
        'content',
        'is_admin',
        'is_hidden',
        'reply',
      ])
      .sort({ _id: -1 })
      .exec();
  }
}
