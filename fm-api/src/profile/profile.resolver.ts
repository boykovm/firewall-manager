import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor() {}

  @Query(() => Profile)
  async profile(@Args('id', { type: () => Int }) id: number) {
    return {
      id: 123,
      firstName: 'string',
      lastName: 'string123',
    };
  }
}
