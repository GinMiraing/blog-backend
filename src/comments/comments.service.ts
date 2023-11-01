import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MD5 } from 'crypto-js';
import { Model } from 'mongoose';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('comment') private commentModel: Model<Comment>) {}

  async create(data: CreateCommentDto) {
    const { nick, email, link, content, path } = data;

    const createdComment = new this.commentModel({
      _id: Date.now(),
      nick,
      email,
      email_md5: MD5(email).toString(),
      link,
      content,
      is_admin: link === 'https://blog.zengjunyin.com',
      is_hidden: false,
      path,
      reply: 0,
    });

    return createdComment.save();
  }

  async findAll() {
    const comments = await this.commentModel.find().exec();
    return comments;
  }

  async findOne(id: number) {
    const comment = await this.commentModel.findById(id).exec();

    if (!comment) {
      return new NotFoundException('评论未找到');
    }

    return comment;
  }

  async update(id: number, data: UpdateCommentDto) {
    const comment = await this.commentModel.findById(id).exec();

    if (!comment) {
      return new NotFoundException('评论未找到');
    }

    await comment.updateOne(data);

    return {
      code: 200,
      message: '更新成功',
    };
  }

  async remove(id: number) {
    const comment = await this.commentModel.findById(id).exec();

    if (!comment) {
      return new NotFoundException('评论未找到');
    }

    await comment.deleteOne();

    return {
      code: 200,
      message: '删除成功',
    };
  }
}
