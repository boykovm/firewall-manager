import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { FirewallService } from './firewall.service';
import { FirewallStatus, FirewallStatusEnum } from './dto/firewall.args';
import { AuthGuard } from '../auth/auth.guard';

@Resolver()
export class FirewallResolver {
  constructor(private readonly firewallService: FirewallService) {}

  @Query(() => FirewallStatus)
  @UseGuards(AuthGuard)
  async getFirewallStatus(): Promise<FirewallStatus> {
    return { status: FirewallStatusEnum.off };
  }
}
