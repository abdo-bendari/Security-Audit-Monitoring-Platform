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
exports.updateSettings = exports.getSettings = void 0;
const Setting_1 = require("../../../../database/models/Setting");
const Error_1 = require("../../../utils/Error");
const getSettings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield Setting_1.Setting.findOne();
    if (!settings)
        throw new Error_1.AppError("Settings not found", 404);
    return res.status(200).json({ data: settings });
});
exports.getSettings = getSettings;
const updateSettings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = req.body;
    let settings = yield Setting_1.Setting.findOne();
    if (!settings) {
        settings = new Setting_1.Setting(Object.assign({}, updates));
    }
    else {
        Object.assign(settings, updates);
    }
    settings.updatedAt = new Date();
    yield settings.save();
    return res.status(200).json({
        message: "Settings updated successfully",
        data: settings,
    });
});
exports.updateSettings = updateSettings;
