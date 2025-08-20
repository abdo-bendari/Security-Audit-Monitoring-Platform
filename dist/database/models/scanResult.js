"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanResult = void 0;
const mongoose_1 = require("mongoose");
const headerSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });
const vulnerabilitySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    description: { type: String },
}, { _id: false });
const scanResultSchema = new mongoose_1.Schema({
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
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: false },
}, { timestamps: true });
exports.ScanResult = (0, mongoose_1.model)("ScanResult", scanResultSchema);
