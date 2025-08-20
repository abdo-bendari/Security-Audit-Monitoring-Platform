// src/modules/accessLog/accessLog.schema.ts
import { Schema, Types, model } from 'mongoose';

export interface IAccessLog {
  ipAddress: string;
  userAgent: string;
  requestedUrl: string;
  scanId: Types.ObjectId;
  timestamp: Date;
  statusCode: number;
  initiatedBy: Types.ObjectId;
}

const accessLogSchema = new Schema<IAccessLog>(
  {
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    requestedUrl: { type: String, required: true },
    scanId: { type: Schema.Types.ObjectId, ref: 'ScanResult', required: true },
    timestamp: { type: Date, default: Date.now },
    statusCode: { type: Number, required: true },
    initiatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const AccessLog = model<IAccessLog>('AccessLog', accessLogSchema);
