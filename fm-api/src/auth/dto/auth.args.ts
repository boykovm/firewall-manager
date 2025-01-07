import { Field, ArgsType, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class SignInArgs {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class AccessKeyResponse {
  @Field()
  accessToken: string;
}
