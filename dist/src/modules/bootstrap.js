"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scanResult_routes_1 = __importDefault(require("./ScanResult/scanResult.routes"));
const accessLog_routes_1 = __importDefault(require("./AccessLog/accessLog.routes"));
const notification_routes_1 = __importDefault(require("./Notification/notification.routes"));
const feedback_routes_1 = __importDefault(require("./Feedback/feedback.routes"));
const apiKey_routes_1 = __importDefault(require("./ApiKey/apiKey.routes"));
const setting_routes_1 = __importDefault(require("./Setting/setting.routes"));
const dashboard_routes_1 = __importDefault(require("./Dashboard/controller/dashboard.routes"));
const auth_routes_1 = __importDefault(require("./Auth/auth.routes"));
// Routers
const bootstrap = (app) => {
    app.use("/api/v1/auth", auth_routes_1.default);
    app.use("/api/v1/api-keys", apiKey_routes_1.default);
    app.use("/api/v1/logs", accessLog_routes_1.default);
    app.use("/api/v1/dashboard", dashboard_routes_1.default);
    app.use("/api/v1/feedbacks", feedback_routes_1.default);
    app.use("/api/v1/notifications", notification_routes_1.default);
    app.use("/api/v1/settings", setting_routes_1.default);
    app.use("/api/v1/scans", scanResult_routes_1.default);
};
exports.default = bootstrap;
