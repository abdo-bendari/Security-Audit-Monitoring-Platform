import { Setting } from "../../../../database/models/Setting";
import { AppError } from "../../../utils/Error";
import { NextFunction, Request, Response } from "express";



export const getSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const settings = await Setting.findOne();
  if (!settings) throw new AppError("Settings not found", 404);

  return res.status(200).json({ data: settings });
};

export const updateSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updates = req.body;

  let settings = await Setting.findOne();

  if (!settings) {
    settings = new Setting({ ...updates });
  } else {
    Object.assign(settings, updates);
  }

  settings.updatedAt = new Date();
  await settings.save();

  return res.status(200).json({
    message: "Settings updated successfully",
    data: settings,
  });
};
