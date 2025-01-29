import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';

import { FirewallNames, FirewallStatusEnum, ProcessStatusEnum } from './dto/firewall.args';

import { promisify } from 'util';

@Injectable()
export class FirewallService {
  private execPromise;
  firewallUpdateConstants: Record<FirewallNames, Record<FirewallStatusEnum, string>> = {
    ufw: {
      on: 'sudo ufw enable',
      off: 'sudo ufw disable',
    },
  };
  firewallSettings: Record<FirewallNames, string> = {
    ufw: 'sudo ufw status',
  };
  firewallStatusResponse: Record<FirewallNames, Record<FirewallStatusEnum, string>> = {
    ufw: {
      on: 'Status: active',
      off: 'Status: inactive',
    },
  };

  constructor() {
    this.execPromise = promisify(exec);
  }
  async getFirewallStatus(): Promise<FirewallStatusEnum> {
    const result = await this.runCommandPromise('sudo ufw status');

    const status = result.split('\n')?.[0];
    if (!status) {
      throw new InternalServerErrorException('Unable to get firewall status');
    }

    // TODO: add keyOf response
    if (status === this.firewallStatusResponse.ufw.on) {
      return FirewallStatusEnum.on;
    } else if (status === this.firewallStatusResponse.ufw.off) {
      return FirewallStatusEnum.off;
    }

    throw new BadRequestException('Unsupported request');
  }

  async runCommandPromise(command: string): Promise<string> {
    try {
      const { stdout } = await this.execPromise(command);
      return stdout;
    } catch (error: any) {
      if (error.hasOwnProperty('stderr') || error?.message) {
        console.error(`Error: ${error?.stderr || error?.message}`);
      } else {
        console.error(`Error: ${error}`);
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async updateFirewallStatus(newFirewallStatus: FirewallStatusEnum): Promise<ProcessStatusEnum> {
    const cmd = this.firewallUpdateConstants['ufw']?.[newFirewallStatus];
    if (!cmd) {
      throw new BadRequestException();
    }

    await this.runCommandPromise(cmd);

    const currentStatus = await this.getFirewallStatus();

    return currentStatus === newFirewallStatus ? ProcessStatusEnum.success : ProcessStatusEnum.failed;
  }

  async getFirewallSettings(firewallName: FirewallNames): Promise<Array<string>> {
    const cmd = this.firewallSettings[firewallName];
    if (!cmd) {
      throw new BadRequestException();
    }

    const result: string = await this.runCommandPromise(cmd);

    return result.split('\n');
  }
}
