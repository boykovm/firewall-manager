import { Module } from '@nestjs/common';

import { FirewallService } from './firewall.service';
import { FirewallResolver } from './firewall.resolver';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [ProfileModule],
  providers: [FirewallService, FirewallResolver],
})
export class FirewallModule {}
