import { AppError } from "../../../utils/Error";
import { Notification } from "../../../../database/models/Notification";
import { NextFunction, Request, Response } from "express";
import sendEmail from "../../../utils/sendEmail";
import { User } from "../../../../database/models/User";



export const createNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, title, message, type } = req.body;

  if (!email || !title || !message || !type)
    return next(new AppError("Missing required fields", 400));

  const notification = await Notification.create({
    email,
    title,
    message,
    type,
    read: false,
    createdAt: new Date(),
  });

 const user = await User.findOne({email : email})
    await sendEmail({
      to: email,
      subject: `[${type.toUpperCase()}] ${title}`,
      text: message,
    });
  

  return res.status(201).json({
    message: "Notification sent",
    data: notification,
  });
};

export const getMyNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;
  const notifications = await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    count: notifications.length,
    data: notifications,
  });
};

export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const notif = await Notification.findById(id);
  if (!notif) return next(new AppError("Notification not found", 404));

  notif.read = true;
  await notif.save();

  return res.status(200).json({ message: "Notification marked as read" });
};

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const notif = await Notification.findById(id);
  if (!notif) return next(new AppError("Notification not found", 404));

  await notif.deleteOne();

  return res.status(200).json({ message: "Notification deleted" });
};
