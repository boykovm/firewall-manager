import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateRoleArgs } from './dto/role.args';
import { Role } from './interfaces/role.interface';

@Injectable()
export class RoleService {
  constructor(@Inject('ROLE_MODEL') private readonly roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleArgs): Promise<Role> {
    return this.roleModel.create(createRoleDto);
  }
}
