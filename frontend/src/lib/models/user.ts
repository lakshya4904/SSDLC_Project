import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
  id: number;
  username: string;
  type:string;
  profileImageURL:string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username:         { type: String, required: true,  unique: true },
  type:             { type: String, default:"user"},
  email:            { type: String, required: true, unique: true },
  password:         { type: String, required: true },
  profileImageURL:  { type: String },
},
{
  timestamps: true //createdAt, updatedAt
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

//make an initialzer for user interface
export const initializeUser = (data: Partial<IUser>): IUser => {
  return {
    id: data.id || 0,
    username: data.username || '',
    type: data.type || 'user',
    profileImageURL: data.profileImageURL || '',
    email: data.email || '',
    password: data.password || '',
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  };
};