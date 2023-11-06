import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipThrottle({ default: true })
  @Get()
  async getSignature() {
    return {
      signature: await this.authService.generateSignature(),
    };
  }
}
