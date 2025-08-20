import express from 'express';
import catchError from '../../middleware/catchError';
import * as SettingController  from './controller/setting.controller';
import protectedRoutes, { allowedTo } from '../../middleware/authentication';
 const settingRouter = express.Router();
settingRouter
.get("/", protectedRoutes, catchError(SettingController.getSettings))
.put("/",protectedRoutes,allowedTo("admin"), catchError(SettingController.updateSettings));
 export default settingRouter;