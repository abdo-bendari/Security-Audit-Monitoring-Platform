"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKey = void 0;
const mongoose_1 = require("mongoose");
const apiKeySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    key: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
}, { timestamps: false });
exports.ApiKey = (0, mongoose_1.model)("ApiKey", apiKeySchema);
