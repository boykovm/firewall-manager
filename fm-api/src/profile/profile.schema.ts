import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
