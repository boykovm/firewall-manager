import { Mongoose } from 'mongoose';

import { RoleSchema } from './role.schema';

export const roleProviders = [
  {
    provide: 'ROLE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Role', RoleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
