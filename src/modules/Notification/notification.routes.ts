import express from 'express';
import catchError from '../../middleware/catchError';
import * as N from './controller/notification.controller';
import protectedRoutes from '../../middleware/authentication';
const   notificationRouter = express.Router();
notificationRouter
  .post("/", protectedRoutes, catchError(N.createNotification))
  .get("/", protectedRoutes, catchError(N.getMyNotifications))
  .patch("/:id/read", protectedRoutes, catchError(N.markAsRead))
  .delete("/:id", protectedRoutes, catchError(N.deleteNotification));

export default notificationRouter;