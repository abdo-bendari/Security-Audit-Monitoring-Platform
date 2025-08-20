import { ApiKey } from "../../../../database/models/ApiKey";
import { AppError } from "../../../utils/Error";
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";



export const createApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;

  const existing = await ApiKey.findOne({ user: userId, isActive: true });
  if (existing) throw new AppError("API key already exists", 400);

  const key = crypto.randomBytes(32).toString("hex");

  const apiKey = await ApiKey.create({
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
};

export const getMyApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;
  const apiKey = await ApiKey.findOne({ user: userId });

  if (!apiKey) throw new AppError("API key not found", 404);

  return res.status(200).json({ data: apiKey });
};

export const toggleApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;
  const apiKey = await ApiKey.findOne({ user: userId });

  if (!apiKey) throw new AppError("API key not found", 404);

  apiKey.isActive = !apiKey.isActive;
  await apiKey.save();

  return res.status(200).json({
    message: `API key ${apiKey.isActive ? "activated" : "deactivated"}`,
    data: apiKey,
  });
};

export const deleteApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;
  const apiKey = await ApiKey.findOne({ user: userId });

  if (!apiKey) throw new AppError("API key not found", 404);

  await apiKey.deleteOne();

  return res.status(200).json({ message: "API key deleted successfully" });
};
