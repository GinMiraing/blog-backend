import { Controller, Get } from '@nestjs/common';

import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async sendTestEmail() {
    return this.emailService.sendEmail({
      parentNick: '胤',
      parentAvatar:
        'https://cravatar.cn/avatar/5b787600fd54341c6ddca147754d555b',
      parentContent:
        '父评论内容 - 测试内容 - 这是一段比较长的评论内容，仅用于测试。',
      replyNick: 'GinMiraing',
      replyAvatar:
        'https://cravatar.cn/avatar/5b787600fd54341c6ddca147754d555b',
      replyContent: '这是一段回复内容',
      url: 'https://blog.zengjunyin.com',
      address: 'zengjunyin@foxmail.com',
    });
  }
}
