import { Types , Schema,model} from 'mongoose';

export interface INotification {
  user: Types.ObjectId;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'danger'], required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = model<INotification>('Notification', notificationSchema);
