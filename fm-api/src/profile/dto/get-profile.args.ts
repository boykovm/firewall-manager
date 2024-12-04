import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetProfileArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  lastName: string;
}
