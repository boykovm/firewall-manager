import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AccessKeyResponse, SignInArgs } from './dto/auth.args';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessKeyResponse)
  async signIn(
    @Args({ type: () => SignInArgs })
    signInArgs: SignInArgs,
  ): Promise<AccessKeyResponse> {
    const accessToken = await this.authService.signIn(signInArgs);

    return { accessToken };
  }
}
