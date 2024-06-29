import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from './modals/auth.modal';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(key_master: string): Promise<Login> {
    if (key_master !== process.env.KEY_MASTER) {
      throw new UnauthorizedException();
    }
    const payload = { username: 'admin' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
