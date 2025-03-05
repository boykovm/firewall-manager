import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateRoleArgs {
  @Field()
  roleName: string;
}
