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
exports.getLogById = exports.getMyLogs = exports.createLog = void 0;
const Error_1 = require("./../../../utils/Error");
const AccessLog_1 = require("../../../../database/models/AccessLog");
const createLog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { requestedUrl, scanId, statusCode } = req.body;
    const ipAddress = req.ip || req.headers["x-forwarded-for"];
    const userAgent = req.headers["user-agent"];
    const initiatedBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!requestedUrl || !scanId || !statusCode) {
        return next(new Error_1.AppError("Missing required fields", 400));
    }
    const log = yield AccessLog_1.AccessLog.create({
        ipAddress,
        userAgent,
        requestedUrl,
        scanId,
        statusCode,
        initiatedBy,
    });
    return res.status(201).json({
        message: "Access log created successfully",
        data: log,
    });
});
exports.createLog = createLog;
const getMyLogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const logs = yield AccessLog_1.AccessLog.find({ initiatedBy: userId }).sort({
        timestamp: -1,
    });
    return res.status(200).json({
        count: logs.length,
        data: logs,
    });
});
exports.getMyLogs = getMyLogs;
const getLogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const log = yield AccessLog_1.AccessLog.findById(req.params.id);
    if (!log)
        return next(new Error_1.AppError("Access log not found", 404));
    return res.status(200).json({ data: log });
});
exports.getLogById = getLogById;
