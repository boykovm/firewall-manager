import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';

import { FirewallStatusEnum, ProcessStatusEnum } from './dto/firewall.args';

import { promisify } from 'util';

@Injectable()
export class FirewallService {
  private execPromise;
  firewallUpdateConstants = {
    ufw: {
      on: 'sudo ufw enable',
      off: 'sudo ufw disable',
    },
  };

  constructor() {
    this.execPromise = promisify(exec);
  }
  async getFirewallStatus(): Promise<FirewallStatusEnum> {
    const result = await this.runCommandPromise('sudo ufw status');

    // TODO: add enum for responses
    if (result.trim() === 'Status: active') {
      return FirewallStatusEnum.on;
    } else if (result.trim() === 'Status: inactive') {
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
}
