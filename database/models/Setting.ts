import { Schema, model } from "mongoose";

export interface ISetting {
  scanLimits: number;                   
  emailNotificationEnabled: boolean;    
  dashboardTheme: 'light' | 'dark';     
  maintenanceMode: boolean;             
  updatedAt: Date;                      
}

const settingSchema = new Schema(
  {
    scanLimits: { type: Number, default: 10 },
    emailNotificationEnabled: { type: Boolean, default: true },
    dashboardTheme: { type: String, enum: ["light", "dark"], default: "light" },
    maintenanceMode: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const Setting = model("Setting", settingSchema);
