import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MD5 } from 'crypto-js';
import { Model } from 'mongoose';
import { Comment } from 'src/comment/entities/comment.entity';
import { EmailService } from 'src/email/email.service';

import { CreateReplyDto } from './dto/create-reply.dto';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel('reply') private replyModel: Model<Reply>,
    @InjectModel('comment') private commentModel: Model<Comment>,
    private readonly emailService: EmailService,
  ) {}

  async create(data: CreateReplyDto) {
    const { nick, email, link, content, parent_id, reply_id } = data;

    const parentComment = await this.commentModel.findById(parent_id).exec();

    if (!parentComment) {
      throw new NotFoundException('父评论未找到');
    }

    await parentComment.updateOne({ $inc: { reply: 1 } });

    let repliedComment = null;

    if (parent_id === reply_id) {
      repliedComment = parentComment;
    } else {
      repliedComment = await this.replyModel.findById(reply_id).exec();
    }

    if (!repliedComment) {
      throw new NotFoundException('被回复评论未找到');
    }

    const createdComment = new this.replyModel({
      nick,
      email,
      email_md5: MD5(email).toString(),
      link,
      content,
      is_admin: link === 'https://blog.zengjunyin.com',
      path: repliedComment.path,
      parent_id,
      reply_id,
      reply_nick: repliedComment.nick,
    });

    await createdComment.save();

    await this.emailService.sendEmail({
      parentNick: repliedComment.nick,
      parentAvatar: `https://cravatar.cn/avatar/${repliedComment.email_md5}`,
      parentContent: repliedComment.content,
      replyNick: nick,
      replyAvatar: `https://cravatar.cn/avatar/${MD5(email).toString()}`,
      replyContent: content,
      url: `https://blog.zengjunyin.com${repliedComment.path}`,
      address: repliedComment.email,
    });

    return createdComment;
  }

  async findByParentId(parent_id: number) {
    return await this.replyModel
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
  }
}
