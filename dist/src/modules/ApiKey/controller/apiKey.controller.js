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
exports.deleteApiKey = exports.toggleApiKey = exports.getMyApiKey = exports.createApiKey = void 0;
const ApiKey_1 = require("../../../../database/models/ApiKey");
const Error_1 = require("../../../utils/Error");
const crypto_1 = __importDefault(require("crypto"));
const createApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const existing = yield ApiKey_1.ApiKey.findOne({ user: userId, isActive: true });
    if (existing)
        throw new Error_1.AppError("API key already exists", 400);
    const key = crypto_1.default.randomBytes(32).toString("hex");
    const apiKey = yield ApiKey_1.ApiKey.create({
        user: userId,
        key,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        isActive: true,
    });
    return res.status(201).json({
        message: "API key created successfully",
        data: apiKey,
    });
});
exports.createApiKey = createApiKey;
const getMyApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const apiKey = yield ApiKey_1.ApiKey.findOne({ user: userId });
    if (!apiKey)
        throw new Error_1.AppError("API key not found", 404);
    return res.status(200).json({ data: apiKey });
});
exports.getMyApiKey = getMyApiKey;
const toggleApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const apiKey = yield ApiKey_1.ApiKey.findOne({ user: userId });
    if (!apiKey)
        throw new Error_1.AppError("API key not found", 404);
    apiKey.isActive = !apiKey.isActive;
    yield apiKey.save();
    return res.status(200).json({
        message: `API key ${apiKey.isActive ? "activated" : "deactivated"}`,
        data: apiKey,
    });
});
exports.toggleApiKey = toggleApiKey;
const deleteApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const apiKey = yield ApiKey_1.ApiKey.findOne({ user: userId });
    if (!apiKey)
        throw new Error_1.AppError("API key not found", 404);
    yield apiKey.deleteOne();
    return res.status(200).json({ message: "API key deleted successfully" });
});
exports.deleteApiKey = deleteApiKey;
