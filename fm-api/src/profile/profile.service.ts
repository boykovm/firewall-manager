import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Profile } from './interfaces/profile.interface';
import { CreateProfileArgs } from './dto/profile.args';

@Injectable()
export class ProfileService {
  constructor(@Inject('PROFILE_MODEL') private readonly profileModel: Model<Profile>) {}

  async create(createProfileDto: CreateProfileArgs): Promise<Profile> {
    const profileByEmail = await this.getByEmail(createProfileDto.email);
    if (profileByEmail) {
      throw new BadRequestException('Profile already exists');
    }

    const profileByUsername = await this.getByUsername(createProfileDto.username);
    if (profileByUsername) {
      throw new BadRequestException('Profile with such name already exists');
    }

    return this.profileModel.create(createProfileDto);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  async getById(id: string): Promise<Profile> {
    return this.profileModel.findById(id);
  }

  async getByUsername(username: string): Promise<Profile> {
    return this.profileModel.findOne({ username });
  }

  async getByEmail(email: string): Promise<Profile> {
    return this.profileModel.findOne({ email });
  }
}
