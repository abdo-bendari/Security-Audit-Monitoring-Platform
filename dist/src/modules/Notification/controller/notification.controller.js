"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAsRead = exports.getMyNotifications = exports.createNotification = void 0;
const Error_1 = require("../../../utils/Error");
const Notification_1 = require("../../../../database/models/Notification");
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const User_1 = require("../../../../database/models/User");
const createNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, title, message, type } = req.body;
    if (!email || !title || !message || !type)
        return next(new Error_1.AppError("Missing required fields", 400));
    const notification = yield Notification_1.Notification.create({
        email,
        title,
        message,
        type,
        read: false,
        createdAt: new Date(),
    });
    const user = yield User_1.User.findOne({ email: email });
    yield (0, sendEmail_1.default)({
        to: email,
        subject: `[${type.toUpperCase()}] ${title}`,
        text: message,
    });
    return res.status(201).json({
        message: "Notification sent",
        data: notification,
    });
});
exports.createNotification = createNotification;
const getMyNotifications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const notifications = yield Notification_1.Notification.find({ user: userId }).sort({
        createdAt: -1,
    });
    return res.status(200).json({
        count: notifications.length,
        data: notifications,
    });
});
exports.getMyNotifications = getMyNotifications;
const markAsRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const notif = yield Notification_1.Notification.findById(id);
    if (!notif)
        return next(new Error_1.AppError("Notification not found", 404));
    notif.read = true;
    yield notif.save();
    return res.status(200).json({ message: "Notification marked as read" });
});
exports.markAsRead = markAsRead;
const deleteNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const notif = yield Notification_1.Notification.findById(id);
    if (!notif)
        return next(new Error_1.AppError("Notification not found", 404));
    yield notif.deleteOne();
    return res.status(200).json({ message: "Notification deleted" });
});
exports.deleteNotification = deleteNotification;
