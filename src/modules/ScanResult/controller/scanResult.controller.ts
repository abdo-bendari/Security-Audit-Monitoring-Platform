import { AppError } from "./../../../utils/Error";
import { NextFunction, Request, Response } from "express";
import { ScanResult } from "../../../../database/models/ScanResult";
import { scanWebsite } from "../../../utils/scanWebsite";

  export const createScan = async (req: Request, res: Response) => {
    const { url } = req.body;
    // const userId = req.user?.userId;

    if (!url) throw new AppError("URL is required", 400);

    const result = await scanWebsite(url);

    const savedScan = await ScanResult.create({
      
      ...result
      // owner: userId,
    });

    return res.status(201).json({
      message: "Scan completed successfully",
      data: savedScan,
      
    });
  }
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId;
  const scans = await ScanResult.find({ owner: userId }).sort({ scanDate: -1 });

  return res.status(200).json({
    count: scans.length,
    data: scans,
  });
};
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scan = await ScanResult.findById(req.params.id);
  if (!scan) return next(new AppError("Scan result not found", 404));

  return res.status(200).json({ data: scan });
};

export const removeScanResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scan = await ScanResult.findById(req.params.id);
  if (!scan) return next(new AppError("Scan result not found", 404));
   await scan.deleteOne();
  return res.status(200).json({ message: "Scan result deleted successfully" });
};
