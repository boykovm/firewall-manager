import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ProfileService } from '../profile/profile.service';
import { SignInArgs } from './dto/auth.args';

@Injectable()
export class AuthService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInArgs: SignInArgs): Promise<string> {
    const profile = await this.profileService.getByUsername(signInArgs.username);
    if (!profile || profile?.password !== signInArgs.password) {
      throw new NotFoundException("Profile doesn't exist");
    }

    const payload = {
      sub: profile.username,
      username: profile.username,
      userId: profile.id,
    };

    return await this.jwtService.signAsync(payload);
  }
}
