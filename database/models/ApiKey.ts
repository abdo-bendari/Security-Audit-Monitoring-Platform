import { Schema, model, Types } from "mongoose";

export interface IApiKey {
  user: Types.ObjectId;          
  key: string;                  
  createdAt: Date;              
  expiresAt: Date;               
  isActive: boolean;             
}

const apiKeySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    key: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: false }
);

export const ApiKey = model("ApiKey", apiKeySchema);
