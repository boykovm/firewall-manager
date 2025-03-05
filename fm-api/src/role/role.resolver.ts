import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from './models/role.model';
import { CreateRoleArgs } from './dto/role.args';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  @UseGuards(AuthGuard)
  async createRole(
    @Args({ type: () => CreateRoleArgs })
    createRoleArgs: CreateRoleArgs,
  ): Promise<Role> {
    return this.roleService.create(createRoleArgs);
  }
}
