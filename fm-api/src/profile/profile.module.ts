import { Module } from '@nestjs/common';

import { ProfileResolver } from './profile.resolver';
import { DatabaseModule } from '../database/database.module';
import { profileProviders } from './profile.providers';
import { ProfileService } from './profile.service';

@Module({
  imports: [DatabaseModule],
  providers: [ProfileResolver, ProfileService, ...profileProviders],
  exports: [ProfileService],
})
export class ProfileModule {}
