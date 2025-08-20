
import mongoose, { Schema, model,Types } from 'mongoose';

export interface IFeedback {
  user: Types.ObjectId;
  message: string;
  targetScan?: Types.ObjectId;
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  targetScan: { type: Schema.Types.ObjectId, ref: 'ScanResult' },
  createdAt: { type: Date, default: Date.now }
});

export const Feedback = model<IFeedback>('Feedback', feedbackSchema);
