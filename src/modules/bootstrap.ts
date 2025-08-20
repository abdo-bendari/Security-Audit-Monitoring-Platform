
import scanRouter from './ScanResult/scanResult.routes';
import logRouter from './AccessLog/accessLog.routes';
import notificationRouter from './Notification/notification.routes';
import feedbackRouter from './Feedback/feedback.routes';
import apiKeyRouter from './ApiKey/apiKey.routes';
import settingRouter from './Setting/setting.routes';
import dashboardRouter from './Dashboard/controller/dashboard.routes';
import authRouter from './Auth/auth.routes';
import { Express } from "express";

// Routers


const bootstrap = (app: Express) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/api-keys", apiKeyRouter);
  app.use("/api/v1/logs", logRouter);
  app.use("/api/v1/dashboard", dashboardRouter);
  app.use("/api/v1/feedbacks", feedbackRouter);
  app.use("/api/v1/notifications", notificationRouter);
  app.use("/api/v1/settings", settingRouter);
  app.use("/api/v1/scans", scanRouter);
};

export default bootstrap;
