import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { FirewallService } from './firewall.service';
import {
  FirewallSettings,
  FirewallSettingsArgs,
  FirewallStatus,
  ProcessStatus,
  UpdateFirewallStatusArgs,
} from './dto/firewall.args';
import { AuthGuard } from '../auth/auth.guard';

@Resolver()
export class FirewallResolver {
  constructor(private readonly firewallService: FirewallService) {}

  @Query(() => FirewallStatus)
  @UseGuards(AuthGuard)
  async getFirewallStatus(): Promise<FirewallStatus> {
    const status = await this.firewallService.getFirewallStatus();
    return { status };
  }

  @Mutation(() => ProcessStatus)
  @UseGuards(AuthGuard)
  async updateFirewallStatus(
    @Args({ type: () => UpdateFirewallStatusArgs })
    newFirewallStatus: UpdateFirewallStatusArgs,
  ): Promise<ProcessStatus> {
    const status = await this.firewallService.updateFirewallStatus(newFirewallStatus.newStatus);
    return { status };
  }

  @Query(() => FirewallSettings)
  @UseGuards(AuthGuard)
  async getFirewallSettings(
    @Args({ type: () => FirewallSettingsArgs })
    args: FirewallSettingsArgs,
  ): Promise<FirewallSettings> {
    const settings = await this.firewallService.getFirewallSettings(args.firewallName);
    return { settings };
  }
}
