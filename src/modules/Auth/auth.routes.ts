import * as A from "./controller/auth.controller";
import express from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication";
import { checkEmail } from "../../middleware/checkEmail";
const authRouter = express.Router();


  authRouter
  .post("/signup", checkEmail, A.signUp)
  .post("/signin", A.signIn)
  .patch("/password", A.changeUserPassword)
  .get("/", protectedRoutes, allowedTo("admin"), A.getAllUsers)
  .get("/:id", protectedRoutes, allowedTo("admin"), A.getUserById)
  .delete("/:id", protectedRoutes, allowedTo("athlete"), A.deleteUserAccount);


export default authRouter;
