import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FirewallStatus {
  @Field()
  status: FirewallStatusEnum;
}

export enum FirewallStatusEnum {
  on = 'on',
  off = 'off',
}
