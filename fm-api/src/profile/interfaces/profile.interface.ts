import { Document } from 'mongoose';

export interface Profile extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
