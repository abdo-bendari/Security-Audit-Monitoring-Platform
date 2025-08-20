import express from "express";
import catchError from "../../middleware/catchError";
import * as FeedbackController from "./controller/feedback.controller";

const feedbackRouter = express.Router();

feedbackRouter
  .post("/", catchError(FeedbackController.createFeedback))
  .get("/", catchError(FeedbackController.getMyFeedback))
  .get("/scan/:scanId", catchError(FeedbackController.getFeedbackForScan))
  .delete("/:id", catchError(FeedbackController.deleteFeedback));


export default feedbackRouter;