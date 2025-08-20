import { AppError } from "./../../../utils/Error";
import { NextFunction, Request, Response } from "express";
import { AccessLog } from "../../../../database/models/AccessLog";


export const createLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { requestedUrl, scanId, statusCode } = req.body;
  const ipAddress = req.ip || req.headers["x-forwarded-for"];
  const userAgent = req.headers["user-agent"];
  const initiatedBy = req.user?.userId;

  if (!requestedUrl || !scanId || !statusCode) {
    return next(new AppError("Missing required fields", 400));
  }

  const log = await AccessLog.create({
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
};

export const getMyLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;

  const logs = await AccessLog.find({ initiatedBy: userId }).sort({
    timestamp: -1,
  });

  return res.status(200).json({
    count: logs.length,
    data: logs,
  });
};

export const getLogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const log = await AccessLog.findById(req.params.id);
  if (!log) return next(new AppError("Access log not found", 404));

  return res.status(200).json({ data: log });
};
