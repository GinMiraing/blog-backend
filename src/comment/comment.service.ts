import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MD5 } from 'crypto-js';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly emailService: EmailService,
  ) {}

  async create(data: CreateCommentDto) {
    if (data.is_reply) {
      await this.createReply(data);
    } else {
      await this.createComment(data);
    }
  }

  async createComment(data: CreateCommentDto) {
    const comment = this.commentRepository.create({
      nick: data.nick,
      email: data.email,
      link: data.link,
      content: data.content,
      path: data.path,
      email_md5: MD5(data.email).toString(),
      is_admin: data.link === 'https://blog.zengjunyin.com',
      timestamp: Date.now(),
    });

    await this.commentRepository.save(comment);
  }

  async createReply(data: CreateCommentDto) {
    const parentComment = await this.commentRepository.findOne({
      where: {
        id: data.parent_id,
      },
    });

    if (!parentComment) {
      throw new NotFoundException('invalid parent_id');
    }

    const replyComment =
      data.parent_id === data.reply_id
        ? parentComment
        : await this.commentRepository.findOne({
            where: {
              id: data.reply_id,
            },
          });

    if (!replyComment) {
      throw new NotFoundException('invalid reply_id');
    }

    const comment = this.commentRepository.create({
      nick: data.nick,
      email: data.email,
      email_md5: MD5(data.email).toString(),
      link: data.link,
      content: data.content,
      is_admin: data.link === 'https://blog.zengjunyin.com',
      path: parentComment.path,
      parent_id: parentComment.id,
      reply_id: replyComment.id,
      reply_nick: replyComment.nick,
      timestamp: Date.now(),
    });

    await this.commentRepository.save(comment);

    await this.commentRepository.increment(
      { id: parentComment.id },
      'reply_count',
      1,
    );

    if (replyComment.id !== parentComment.id) {
      await this.commentRepository.increment(
        { id: replyComment.id },
        'reply_count',
        1,
      );
    }

    await this.emailService.sendEmail({
      parentNick: replyComment.nick,
      parentAvatar: `https://cravatar.cn/avatar/${replyComment.email_md5}`,
      parentContent: replyComment.content,
      replyNick: data.nick,
      replyAvatar: `https://cravatar.cn/avatar/${MD5(data.email).toString()}`,
      replyContent: data.content,
      url: `https://blog.zengjunyin.com${replyComment.path}`,
      address: replyComment.email,
    });
  }

  async findByPath(path: string) {
    const comments = await this.commentRepository.find({
      select: [
        'id',
        'nick',
        'content',
        'link',
        'email_md5',
        'is_admin',
        'timestamp',
        'reply_count',
        'parent_id',
        'reply_id',
        'reply_nick',
      ],
      where: {
        path,
        is_hidden: false,
      },
      order: {
        id: 'desc',
      },
    });

    const data = comments
      .filter((comment) => comment.parent_id === 0)
      .map((comment) => ({
        id: comment.id,
        nick: comment.nick,
        content: comment.content,
        link: comment.link,
        email_md5: comment.email_md5,
        is_admin: comment.is_admin,
        timestamp: comment.timestamp,
        reply_count: comment.reply_count,
        reply_list: comments
          .filter((item) => item.parent_id === comment.id)
          .map((item) => ({
            id: item.id,
            nick: item.nick,
            content: item.content,
            link: item.link,
            email_md5: item.email_md5,
            is_admin: item.is_admin,
            timestamp: item.timestamp,
            reply_id: item.reply_id,
            reply_nick: item.reply_nick,
          }))
          .sort((a, b) => a.id - b.id),
      }));

    return data;
  }
}
