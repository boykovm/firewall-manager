import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ProfileModule } from '../profile/profile.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { jwtConstants } from './constants';

@Module({
  imports: [
    ProfileModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
