import { Mongoose } from 'mongoose';
import { ProfileSchema } from './profile.schema';

export const profileProviders = [
  {
    provide: 'PROFILE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Profile', ProfileSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
