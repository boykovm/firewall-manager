import { ArgsType, Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

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

export enum RuleStatusEnum {
  'allow' = 'allow',
  'denny' = 'deny',
  'reject' = 'reject',
  'limit' = 'limit',
}

registerEnumType(RuleStatusEnum, {
  name: 'RuleStatusEnum',
});

export enum ProtocolNameEnum {
  http = 'http',
  tcp = 'tcp',
  udp = 'udp',
}

registerEnumType(ProtocolNameEnum, {
  name: 'ProtocolNameEnum',
});

@InputType()
export class AddFirewallRulesInput {
  @Field(() => FirewallNames)
  firewallName: FirewallNames;

  @Field(() => [Rule])
  rules: Array<Rule>;
}

@InputType()
export class Rule {
  @Field(() => RuleStatusEnum)
  ruleStatus: RuleStatusEnum;

  @Field(() => ProtocolNameEnum)
  protocolName: ProtocolNameEnum;

  @Field(() => Int, { nullable: true })
  sourceIp?: number;

  @Field(() => String, { nullable: true })
  ipRange?: string;

  @Field(() => Int, { nullable: true })
  destinationPort?: number;
}
