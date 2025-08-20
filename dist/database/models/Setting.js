"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const mongoose_1 = require("mongoose");
const settingSchema = new mongoose_1.Schema({
    scanLimits: { type: Number, default: 10 },
    emailNotificationEnabled: { type: Boolean, default: true },
    dashboardTheme: { type: String, enum: ["light", "dark"], default: "light" },
    maintenanceMode: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: false });
exports.Setting = (0, mongoose_1.model)("Setting", settingSchema);
