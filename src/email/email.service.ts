import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail({
    parentNick,
    parentAvatar,
    parentContent,
    replyNick,
    replyAvatar,
    replyContent,
    url,
    address,
  }: {
    parentNick: string;
    parentAvatar: string;
    parentContent: string;
    replyNick: string;
    replyAvatar: string;
    replyContent: string;
    url: string;
    address: string;
  }) {
    try {
      const transport = createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER || '123456@qq.com',
          pass: process.env.SMTP_KEY || '123456',
        },
      });

      await transport.sendMail({
        from: process.env.SMTP_USER || '123456@qq.com',
        to: address,
        subject: '评论回复通知 - 胤的博客',
        html: `
        <div>
          <div style="display: flex; position: relative; width: 100%; height: 206px; background: #ef859d2e; top: 0; left: 0; justify-content: center;">
            <div style="background-image: url('https://article.biliimg.com/bfs/article/d29fe12c860c2b7a54db6483132fb0cf24d6aeb0.png@.webp'); position: absolute; width: 100px; height: 100px; display: flex; top: 130px; background-size: cover; border-radius: 10px;"></div>
          </div>
          <div style="margin-top: 92px; display: flex; flex-direction: column; align-items: center;">
            <div style="display: flex; flex-direction: column; align-items: center; margin: 0 20px;">
              <span style="font-size: 26px; font-weight: bold; color: #000000; line-height: 37px; text-align: center;">嘿 ${parentNick}！您在 ${'胤的博客'} 中收到一条新回复！</span>
              <span style="font-size: 16px; font-weight: bold; color: #00000030; line-height: 22px; margin-top: 21px; text-align: center;">您之前在 ${'胤的博客'} 中的评论收到来自 ${replyNick} 的回复</span>
            </div>
            <div style="margin: 0 20px; min-height: 128px; background: #F7F7F7; border-radius: 12px; margin-top: 34px; display: flex; flex-direction: column; align-items: flex-start; padding: 32px 16px; width: calc(100% - 40px);">
              <div style="display: flex; margin-left: 30px; margin-bottom: 16px;">
                <div style="background-image: url('${parentAvatar}'); flex-shrink: 0; border-radius: 10px; width: 50px; height: 50px; background-size: cover;"></div>
                <div style="display: flex; flex-direction: column; margin-left: 30px;">
                  <span style="height: 22px; font-size: 16px; font-weight: bold; color: #C5343E; line-height: 22px;">${parentNick}</span>
                  <span style="margin-top: 6px; margin-right: 22px; font-size: 16px; font-weight: 400; color: #000000; line-height: 22px;">${parentContent}</span>
                </div>
              </div>
              <hr style="display: flex; position: relative; border: 1px dashed #ef859d2e; box-sizing: content-box; height: 0px; overflow: visible; width: 100%;">
              <div style="display: flex; margin-left: 30px; margin-top: 16px;">
                <div style="background-image: url('${replyAvatar}'); flex-shrink: 0; border-radius: 10px; width: 50px; height: 50px; background-size: cover;"></div>
                <div style="display: flex; flex-direction: column; margin-left: 30px;">
                  <span style="height: 22px; font-size: 16px; font-weight: bold; color: #C5343E; line-height: 22px;">${replyNick}</span>
                  <span style="margin-top: 6px; margin-right: 22px; font-size: 16px; font-weight: 400; color: #000000; line-height: 22px;">${replyContent}</span>
                </div>
              </div>
              <a style="min-width: 106px; height: 38px; background: #ef859d38; border-radius: 32px; display: flex; align-items: center; justify-content: center; text-decoration: none; margin: auto; margin-top: 32px;" href="${url}">
                <span style="color: #DB214B;">查看详情</span>
              </a>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; margin-top: 34px;">
              <span style="height: 17px; font-size: 12px; font-weight: 400; color: #00000045; line-height: 17px;">此邮件由评论服务自动发出，直接回复无效</span>
              <a style="height: 17px; font-size: 12px; font-weight: 400; color: #DB214B; line-height: 17px; margin-top: 6px; text-decoration: none;" href="${'https://blog.zengjunyin.com'}">前往博客</a>
            </div>
          </div>
        </div>`,
      });

      return {
        message: '邮件发送成功',
      };
    } catch (e) {
      console.log(e);
      return {
        message: '邮件发送失败',
      };
    }
  }
}
