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
exports.removeScanResult = exports.getById = exports.getAll = exports.createScan = void 0;
const Error_1 = require("./../../../utils/Error");
const ScanResult_1 = require("../../../../database/models/ScanResult");
const scanWebsite_1 = require("../../../utils/scanWebsite");
const createScan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    // const userId = req.user?.userId;
    if (!url)
        throw new Error_1.AppError("URL is required", 400);
    const result = yield (0, scanWebsite_1.scanWebsite)(url);
    const savedScan = yield ScanResult_1.ScanResult.create(Object.assign({}, result
    // owner: userId,
    ));
    return res.status(201).json({
        message: "Scan completed successfully",
        data: savedScan,
    });
});
exports.createScan = createScan;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const scans = yield ScanResult_1.ScanResult.find({ owner: userId }).sort({ scanDate: -1 });
    return res.status(200).json({
        count: scans.length,
        data: scans,
    });
});
exports.getAll = getAll;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const scan = yield ScanResult_1.ScanResult.findById(req.params.id);
    if (!scan)
        return next(new Error_1.AppError("Scan result not found", 404));
    return res.status(200).json({ data: scan });
});
exports.getById = getById;
const removeScanResult = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const scan = yield ScanResult_1.ScanResult.findById(req.params.id);
    if (!scan)
        return next(new Error_1.AppError("Scan result not found", 404));
    yield scan.deleteOne();
    return res.status(200).json({ message: "Scan result deleted successfully" });
});
exports.removeScanResult = removeScanResult;
