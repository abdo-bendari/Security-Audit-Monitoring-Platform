import express from 'express';
import catchError from '../../middleware/catchError';
import * as Api from './controller/apiKey.controller';
import protectedRoutes from '../../middleware/authentication';

const apiKeyRouter = express.Router();

apiKeyRouter
  .post("/", protectedRoutes, catchError(Api.createApiKey))
  .get("/", protectedRoutes, catchError(Api.getMyApiKey))
  .patch("/:id/toggle", protectedRoutes, catchError(Api.toggleApiKey))
  .delete("/:id", protectedRoutes, catchError(Api.deleteApiKey));


export default apiKeyRouter;