import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';

import { FirewallNames, FirewallStatusEnum, ProcessStatusEnum, Rule, RuleStatusEnum } from './dto/firewall.args';

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
  firewallRuleStatus: Record<FirewallNames, Record<RuleStatusEnum, string>> = {
    ufw: {
      allow: 'allow',
      deny: 'deny',
      reject: 'reject',
      limit: 'allow',
    },
  };
  firewallStatusRuleAdded: Record<FirewallNames, string> = {
    ufw: 'Rule added',
  };
  firewallRuleAlreadyAdded: Record<FirewallNames, string> = {
    ufw: 'Skipping adding existing rule',
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

  async addFirewallRules(firewallName: FirewallNames, rules: Rule[]): Promise<ProcessStatusEnum[]> {
    const promises = [];
    rules.forEach((rule) => {
      const command = this.firewallRuleConvertor(firewallName, rule);

      promises.push(this.runCommandPromise(command));
    });

    const statuses = await Promise.all(promises);

    const executionSuccess = statuses.map((status) => {
      const result = status.split('\n').filter((res) => res.length);

      return (
        result.includes(this.firewallStatusRuleAdded[firewallName]) ||
        result.includes(this.firewallRuleAlreadyAdded[firewallName])
      );
    });

    return executionSuccess.map((result) => (result ? ProcessStatusEnum.success : ProcessStatusEnum.failed));
  }

  firewallRuleConvertor(firewallName: FirewallNames, { ruleFrom, ruleTo, ruleStatus, protocolName }: Rule): string {
    let command = `sudo ${firewallName} ${this.firewallRuleStatus[firewallName][ruleStatus]} `;

    if (ruleFrom?.ipRange) {
      command += `from ${ruleFrom.ipRange} `;
    } else if (ruleFrom?.ip) {
      command += `from ${ruleFrom.ip} `;
    } else {
      command += `from any `;
    }

    if (ruleFrom?.port) {
      command += `port ${ruleFrom.port} `;
    }

    if (protocolName) {
      command += `proto ${protocolName} `;
    }

    if (ruleTo?.ipRange) {
      command += `to ${ruleTo.ipRange} `;
    } else if (ruleTo?.ip) {
      command += `to ${ruleTo.ip} `;
    } else {
      command += `to any `;
    }

    if (ruleTo?.port) {
      command += `port ${ruleTo.port}`;
    }

    return command;
  }
}
