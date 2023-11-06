import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { SHA256 } from 'crypto-js';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException('非法请求');
    }

    const decodedApiKey = Buffer.from(apiKey, 'base64').toString();

    try {
      JSON.parse(decodedApiKey);
    } catch (e) {
      throw new BadRequestException('请求参数非法');
    }

    const { timestamp, token } = JSON.parse(decodedApiKey) as {
      timestamp: number;
      token: string;
    };

    if (!timestamp || Date.now() - timestamp > 1 * 60 * 1000) {
      throw new UnauthorizedException('非法请求');
    }

    const secretKey = process.env.SECRET_KEY || 'secretkey';
    const checkToken = SHA256(timestamp + secretKey).toString();

    if (token !== checkToken) {
      throw new UnauthorizedException('非法请求');
    }

    next();
  }
}
