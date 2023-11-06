import { Injectable } from '@nestjs/common';
import { SHA256 } from 'crypto-js';

@Injectable()
export class AuthService {
  async generateSignature() {
    const timestamp = Date.now();
    const secretKey = process.env.SECRET_KEY || 'secretkey';

    const token = SHA256(`${timestamp}${secretKey}`).toString();

    const signature = btoa(
      JSON.stringify({
        timestamp,
        token,
      }),
    );

    return signature;
  }
}
