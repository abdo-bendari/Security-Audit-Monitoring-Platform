"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    reports: [{ type: mongoose_1.Types.ObjectId, ref: 'ScanResult' }],
    apiKey: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.User = (0, mongoose_1.model)('User', userSchema);
