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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDashboard = exports.getUserDashboard = void 0;
const User_1 = require("../../../../database/models/User");
const ScanResult_1 = require("../../../../database/models/ScanResult");
const Setting_1 = require("../../../../database/models/Setting");
const Notification_1 = require("../../../../database/models/Notification");
const ApiKey_1 = require("../../../../database/models/ApiKey");
const getUserDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const [scanCount, lastScan, unreadNotifications, apiKey] = yield Promise.all([
        ScanResult_1.ScanResult.countDocuments({ owner: userId }),
        ScanResult_1.ScanResult.findOne({ owner: userId }).sort({ scanDate: -1 }),
        Notification_1.Notification.countDocuments({ user: userId, read: false }),
        ApiKey_1.ApiKey.findOne({ user: userId }),
    ]);
    return res.status(200).json({
        scans: scanCount,
        lastScan,
        unreadNotifications,
        apiKey: apiKey
            ? {
                isActive: apiKey.isActive,
                expiresAt: apiKey.expiresAt,
            }
            : null,
    });
});
exports.getUserDashboard = getUserDashboard;
const getAdminDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const [userCount, todayScanCount, totalScans, openNotifications, settings] = yield Promise.all([
        User_1.User.countDocuments(),
        ScanResult_1.ScanResult.countDocuments({
            scanDate: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
        }),
        ScanResult_1.ScanResult.countDocuments(),
        Notification_1.Notification.countDocuments({ read: false }),
        Setting_1.Setting.findOne(),
    ]);
    return res.status(200).json({
        users: userCount,
        scansToday: todayScanCount,
        totalScans,
        unreadNotifications: openNotifications,
        maintenanceMode: (settings === null || settings === void 0 ? void 0 : settings.maintenanceMode) || false,
        theme: (settings === null || settings === void 0 ? void 0 : settings.dashboardTheme) || "light",
    });
});
exports.getAdminDashboard = getAdminDashboard;
