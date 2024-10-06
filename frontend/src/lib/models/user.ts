import mongoose, { Schema, Document } from 'mongoose';

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