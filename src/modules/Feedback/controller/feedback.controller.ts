import { Feedback } from "../../../../database/models/Feedback";
import { AppError } from "../../../utils/Error";
import { NextFunction, Request, Response } from "express";


export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;
  const { message, targetScan } = req.body;

  if (!message) throw new AppError("Feedback message is required", 400);

  const feedback = await Feedback.create({
    user: userId,
    message,
    targetScan: targetScan || null,
  });

  return res.status(201).json({
    message: "Feedback submitted successfully",
    data: feedback,
  });
};

export const getMyFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;

  const feedbacks = await Feedback.find({ user: userId })
    .populate("targetScan", "url scanDate securityGrade")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    count: feedbacks.length,
    data: feedbacks,
  });
};

export const getFeedbackForScan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { scanId } = req.params;

  const feedbacks = await Feedback.find({ targetScan: scanId }).populate(
    "user",
    "name email"
  );

  return res.status(200).json({
    count: feedbacks.length,
    data: feedbacks,
  });
};

export const deleteFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const feedback = await Feedback.findById(id);

  if (!feedback) throw new AppError("Feedback not found", 404);

  await feedback.deleteOne();

  return res.status(200).json({ message: "Feedback deleted successfully" });
};
