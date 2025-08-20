import express from 'express';
import catchError from '../../middleware/catchError';
import * as Scan from './controller/scanResult.controller';
import protectedRoutes from '../../middleware/authentication';
const scanRouter = express.Router();

scanRouter
  .post("/scan", catchError(Scan.createScan))            
  .get("/", protectedRoutes, catchError(Scan.getAll))
  .get("/:id", protectedRoutes, catchError(Scan.getById))
  .delete("/:id", protectedRoutes, catchError(Scan.removeScanResult));



export default scanRouter;