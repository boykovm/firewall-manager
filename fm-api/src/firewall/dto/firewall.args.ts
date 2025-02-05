import { ArgsType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class FirewallStatus {
  @Field(() => FirewallStatusEnum)
  status: FirewallStatusEnum;
}

export enum FirewallStatusEnum {
  on = 'on',
  off = 'off',
}

registerEnumType(FirewallStatusEnum, {
  name: 'FirewallStatusEnum',
});

@ObjectType()
export class ProcessStatus {
  @Field(() => ProcessStatusEnum)
  status: ProcessStatusEnum;
}

export enum ProcessStatusEnum {
  success = 'success',
  failed = 'failed',
}

registerEnumType(ProcessStatusEnum, {
  name: 'ProcessStatusEnum',
});

@ArgsType()
export class UpdateFirewallStatusArgs {
  @Field(() => FirewallStatusEnum)
  newStatus: FirewallStatusEnum;
}

@ObjectType()
export class FirewallSettings {
  @Field(() => [String])
  settings: Array<string>;
}

export enum FirewallNames {
  ufw = 'ufw',
}

registerEnumType(FirewallNames, {
  name: 'FirewallNames',
});

@ArgsType()
export class FirewallSettingsArgs {
  @Field(() => FirewallNames)
  firewallName: FirewallNames;
}
