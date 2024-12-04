import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { CreateProfileArgs } from './dto/create-profile.args';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  async profile(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Profile> {
    return this.profileService.getById(id);
  }

  @Mutation(() => Profile)
  async createProfile(
    @Args({ type: () => CreateProfileArgs })
    createProfileArgs: CreateProfileArgs,
  ): Promise<Profile> {
    return this.profileService.create(createProfileArgs);
  }
}
