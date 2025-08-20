import express from 'express';
import catchError from '../../middleware/catchError';
import * as Log from './controller/accessLog.controller';

const logRouter = express.Router();
logRouter
  .post("/", catchError(Log.createLog))
  .get("/", catchError(Log.getMyLogs))
  .get("/:id", catchError(Log.getLogById));


export default logRouter;