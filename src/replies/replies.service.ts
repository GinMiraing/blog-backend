import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MD5 } from 'crypto-js';
import { Model } from 'mongoose';
import { Comment } from 'src/comments/entities/comment.entity';

import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Reply } from './entities/reply.entity';

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel('reply') private replyModel: Model<Reply>,
    @InjectModel('comment') private commentModel: Model<Comment>,
  ) {}

  async create(data: CreateReplyDto) {
    const { nick, email, link, content, parent_id, reply_id } = data;

    const repliedComment = await this.commentModel.findById(reply_id).exec();

    if (!repliedComment) {
      throw new NotFoundException('被回复评论未找到');
    }

    const createdComment = new this.replyModel({
      _id: Date.now(),
      nick,
      email,
      email_md5: MD5(email).toString(),
      link,
      content,
      is_admin: link === 'https://blog.zengjunyin.com',
      is_hidden: false,
      path: repliedComment.path,
      parent_id,
      reply_id,
      reply_nick: repliedComment.nick,
    });

    return createdComment.save();
  }

  async findAll() {
    const replies = await this.replyModel.find().sort({ _id: 1 }).exec();
    return replies;
  }

  async findAllByParentId(parent_id: number) {
    const replies = await this.replyModel
      .find({ parent_id })
      .select([
        '_id',
        'nick',
        'email_md5',
        'link',
        'content',
        'is_admin',
        'is_hidden',
        'reply_id',
        'reply_nick',
      ])
      .sort({ _id: 1 })
      .exec();
    return replies;
  }

  async findOne(id: number) {
    const reply = await this.replyModel.findById(id).exec();

    if (!reply) {
      throw new NotFoundException('回复未找到');
    }

    return reply;
  }

  async update(id: number, data: UpdateReplyDto) {
    const reply = await this.replyModel.findById(id).exec();

    if (!reply) {
      throw new NotFoundException('回复未找到');
    }

    await reply.updateOne(data);

    return {
      code: 200,
      message: '更新成功',
    };
  }

  async remove(id: number) {
    const reply = await this.replyModel.findById(id).exec();

    if (!reply) {
      throw new NotFoundException('回复未找到');
    }

    await reply.deleteOne();

    return {
      code: 200,
      message: '删除成功',
    };
  }
}
