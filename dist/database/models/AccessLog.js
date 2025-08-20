"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLog = void 0;
// src/modules/accessLog/accessLog.schema.ts
const mongoose_1 = require("mongoose");
const accessLogSchema = new mongoose_1.Schema({
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    requestedUrl: { type: String, required: true },
    scanId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ScanResult', required: true },
    timestamp: { type: Date, default: Date.now },
    statusCode: { type: Number, required: true },
    initiatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
exports.AccessLog = (0, mongoose_1.model)('AccessLog', accessLogSchema);
