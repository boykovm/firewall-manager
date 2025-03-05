import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { roleProviders } from './role.providers';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  providers: [RoleResolver, RoleService, ...roleProviders],
  exports: [RoleService],
})
export class RoleModule {}
