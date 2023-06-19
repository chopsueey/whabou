import express from "express";
import * as profileController from "../controllers/profileController.js";
import * as questionController from "../controllers/questionController.js";
import * as feedbackController from "../controllers/feedbackController.js";

const dashboardRouter = express.Router();

// DASHBOARD
// GET

// POST

// UPDATE

// DELETE

// DASHBOARD/PROFILE

// get
dashboardRouter.get("/profile/:userId", profileController.showProfile);
// dashboardRouter.get("/profile", profileController.showUser);

// post
dashboardRouter.post("/profile", profileController.postProfileData);

// update
dashboardRouter.patch("/profile", profileController.editProfile);

// delete
dashboardRouter.delete("/profile/:id", profileController.deleteAccount);
//dashboardRouter.delete("/profile", profileController.deleteProfileData);

// DASHBOARD/MYQUESTIONS

// get
dashboardRouter.get("/myquestions", questionController.getAllQuestions);
dashboardRouter.get("/myquestions/:id", questionController.getQuestion);

// post
dashboardRouter.post("/myquestions", questionController.postQuestion);

// LIKE (wird noch ausgelagert)
// added the router for the new postLike controller
// dashboardRouter.post("/:id", dashboard.postLike);

//DASHBOARD/FEEDBACK

//post
dashboardRouter.post("/feedback", feedbackController.postFeedback);

//post like
dashboardRouter.post("/feedback", feedbackController.postLike);

export default dashboardRouter;
