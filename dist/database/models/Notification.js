"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'warning', 'danger'], required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
exports.Notification = (0, mongoose_1.model)('Notification', notificationSchema);
