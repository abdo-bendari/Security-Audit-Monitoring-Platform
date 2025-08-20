import { Schema, model, Types } from 'mongoose';

interface Header {
  key: string;
  value: string;
}

interface Vulnerability {
  title: string;
  severity: "low" | "medium" | "high";
  description?: string;
}

interface IScanResult {
  url: string;
  scanDate: Date;
  sslStatus: "valid" | "expired" | "invalid";
  headers: Header[];
  corsPolicy: string;
  securityGrade: string;
  vulnerabilities: Vulnerability[];
  owner: Types.ObjectId;
}

const headerSchema = new Schema<Header>(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const vulnerabilitySchema = new Schema<Vulnerability>(
  {
    title: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    description: { type: String },
  },
  { _id: false }
);

const scanResultSchema = new Schema<IScanResult>(
  {
    url: { type: String, required: true },
    scanDate: { type: Date, default: Date.now },
    sslStatus: {
      type: String,
      enum: ["valid", "expired", "invalid"],
      required: true,
    },
    headers: { type: [headerSchema], default: [] },
    corsPolicy: { type: String, default: "Not set" },
    securityGrade: { type: String },
    vulnerabilities: { type: [vulnerabilitySchema], default: [] },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

export const ScanResult = model<IScanResult>(
  "ScanResult",
  scanResultSchema
);
