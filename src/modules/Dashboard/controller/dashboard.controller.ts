import { AppError } from "../../../utils/Error";
import { User } from "../../../../database/models/User";
import { AccessLog } from "../../../../database/models/AccessLog";
import { ScanResult } from "../../../../database/models/ScanResult";
import { Setting } from "../../../../database/models/Setting";
import { Notification } from "../../../../database/models/Notification";
import { ApiKey } from "../../../../database/models/ApiKey";
import { Request, Response, NextFunction } from "express";


export const getUserDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;

  const [scanCount, lastScan, unreadNotifications, apiKey] = await Promise.all([
    ScanResult.countDocuments({ owner: userId }),
    ScanResult.findOne({ owner: userId }).sort({ scanDate: -1 }),
    Notification.countDocuments({ user: userId, read: false }),
    ApiKey.findOne({ user: userId }),
  ]);

  return res.status(200).json({
    scans: scanCount,
    lastScan,
    unreadNotifications,
    apiKey: apiKey
      ? {
          isActive: apiKey.isActive,
          expiresAt: apiKey.expiresAt,
        }
      : null,
  });
};

export const getAdminDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [userCount, todayScanCount, totalScans, openNotifications, settings] =
    await Promise.all([
      User.countDocuments(),
      ScanResult.countDocuments({
        scanDate: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      }),
      ScanResult.countDocuments(),
      Notification.countDocuments({ read: false }),
      Setting.findOne(),
    ]);

  return res.status(200).json({
    users: userCount,
    scansToday: todayScanCount,
    totalScans,
    unreadNotifications: openNotifications,
    maintenanceMode: settings?.maintenanceMode || false,
    theme: settings?.dashboardTheme || "light",
  });
};
