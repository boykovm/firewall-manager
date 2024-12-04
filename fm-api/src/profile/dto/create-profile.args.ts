import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateProfileArgs {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
