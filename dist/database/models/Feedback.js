"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
const feedbackSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    targetScan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ScanResult' },
    createdAt: { type: Date, default: Date.now }
});
exports.Feedback = (0, mongoose_1.model)('Feedback', feedbackSchema);
