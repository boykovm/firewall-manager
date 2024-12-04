import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Profile } from './interfaces/profile.interface';
import { CreateProfileArgs } from './dto/create-profile.args';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_MODEL') private readonly profileModel: Model<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileArgs): Promise<Profile> {
    return this.profileModel.create(createProfileDto);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  async getById(id: string): Promise<Profile> {
    return this.profileModel.findById(id);
  }
}
