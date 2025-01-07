import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { CreateProfileArgs } from './dto/profile.args';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  @UseGuards(AuthGuard)
  async profile(@Context('req') request: any): Promise<Profile> {
    const { user } = request;
    return this.profileService.getById(user.userId);
  }

  @Mutation(() => Profile)
  async createProfile(
    @Args({ type: () => CreateProfileArgs })
    createProfileArgs: CreateProfileArgs,
  ): Promise<Profile> {
    return this.profileService.create(createProfileArgs);
  }
}
