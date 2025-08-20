import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  reports?: Types.ObjectId[];
  apiKey?: string;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    reports: [{ type: Types.ObjectId, ref: 'ScanResult' }],
    apiKey: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const User = model<IUser>('User', userSchema);
