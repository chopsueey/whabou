import express from "express";
import * as profileController from "../controllers/profileController.js";
import * as questionController from "../controllers/questionController.js";
import * as feedbackController from "../controllers/feedbackController.js";

import * as followController from "../controllers/followController.js";


import * as answerController from "../controllers/answerController.js";
import * as likeController from "../controllers/likeController.js";
import { profilePostSchema } from "../schema/profileSchema.js";
import { feedbackPostSchema } from "../schema/feedbackSchema.js";
//import { likePostSchema } from "../schema/likeSchema.js";
import { questionPostSchema } from "../schema/questionSchema.js";
//import { answerPostSchema } from "../schema/answerSchema.js";
import validate from "../middleware/validateAjv.js";


const dashboardRouter = express.Router();

// DASHBOARD
// GET
dashboardRouter.get("/feed/sort", questionController.getLatestQuestion);
dashboardRouter.get("/trend/sort", questionController.getAllQuestions);
// POST

// UPDATE

// DELETE

// DASHBOARD/PROFILE

// changed the access to the userId to req.user.userId (which is from the jwt cookie)
// so that we don't need send the :userId as params or query

// get
dashboardRouter.get("/profile", profileController.showProfile);
dashboardRouter.get("/profile/:profileId", profileController.getProfile);
// dashboardRouter.get("/profile", profileController.showUser);

// post
// dashboardRouter.post("/profile", profileController.postProfileData);

// patch
dashboardRouter.patch("/profile", profileController.updateProfileData);

// put
dashboardRouter.put("/profile", profileController.editProfile);

// delete
dashboardRouter.delete("/profile", profileController.deleteAccount);
//dashboardRouter.delete("/profile", profileController.deleteProfileData);

// DASHBOARD/MYQUESTIONS

// get
dashboardRouter.get("/myquestions", questionController.getAllQuestions);
dashboardRouter.get("/myquestions/:id", questionController.getQuestion);


// post
dashboardRouter.post("/myquestions", questionController.postQuestion);
// dashboardRouter.post("/question/answers", answerController.checkIfAnswered);

// LIKE
// dashboardRouter.post("/:id", dashboard.postLike);

//DASHBOARD/FEEDBACK

//post
dashboardRouter.post("/feedback", feedbackController.postFeedback);

//post answer
dashboardRouter.post("/question/answer", answerController.answerCounter);

// delete answer
dashboardRouter.delete("/question/answer", answerController.deleteAnswer);

//post like
dashboardRouter.post("/question/likes", likeController.increaseLike);

// delete like
dashboardRouter.delete("/question/likes", likeController.deleteLike);

// FOLLOW / UNFOLLOW
dashboardRouter.post("/follow/:targetUserId", followController.followUser);
dashboardRouter.post("/unfollow/:targetUserId", followController.unfollowUser);


export default dashboardRouter;
