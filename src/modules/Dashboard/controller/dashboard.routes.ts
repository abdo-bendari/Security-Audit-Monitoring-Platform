import protectedRoutes,{ allowedTo } from './../../../middleware/authentication';
import express from 'express';
import catchError from '../../../middleware/catchError';
import * as   DashboardController from './dashboard.controller';

const dashboardRouter = express.Router();
dashboardRouter
  .get("/user", protectedRoutes, allowedTo("user"), catchError(DashboardController.getUserDashboard))
  .get("/admin", protectedRoutes, allowedTo("admin"), catchError(DashboardController.getAdminDashboard));

export default dashboardRouter;