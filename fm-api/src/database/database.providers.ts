import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.DB_URI, {
        dbName: process.env.DB_NAME || 'profile',
      }),
  },
];
