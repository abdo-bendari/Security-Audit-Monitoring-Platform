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
exports.deleteFeedback = exports.getFeedbackForScan = exports.getMyFeedback = exports.createFeedback = void 0;
const Feedback_1 = require("../../../../database/models/Feedback");
const Error_1 = require("../../../utils/Error");
const createFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { message, targetScan } = req.body;
    if (!message)
        throw new Error_1.AppError("Feedback message is required", 400);
    const feedback = yield Feedback_1.Feedback.create({
        user: userId,
        message,
        targetScan: targetScan || null,
    });
    return res.status(201).json({
        message: "Feedback submitted successfully",
        data: feedback,
    });
});
exports.createFeedback = createFeedback;
const getMyFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const feedbacks = yield Feedback_1.Feedback.find({ user: userId })
        .populate("targetScan", "url scanDate securityGrade")
        .sort({ createdAt: -1 });
    return res.status(200).json({
        count: feedbacks.length,
        data: feedbacks,
    });
});
exports.getMyFeedback = getMyFeedback;
const getFeedbackForScan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { scanId } = req.params;
    const feedbacks = yield Feedback_1.Feedback.find({ targetScan: scanId }).populate("user", "name email");
    return res.status(200).json({
        count: feedbacks.length,
        data: feedbacks,
    });
});
exports.getFeedbackForScan = getFeedbackForScan;
const deleteFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const feedback = yield Feedback_1.Feedback.findById(id);
    if (!feedback)
        throw new Error_1.AppError("Feedback not found", 404);
    yield feedback.deleteOne();
    return res.status(200).json({ message: "Feedback deleted successfully" });
});
exports.deleteFeedback = deleteFeedback;
