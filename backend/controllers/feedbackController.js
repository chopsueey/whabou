import likeModel from "../model/likeModel.js";
import feedbackModel from "../model/feedbackModel.js";


// POST FEEDBACK*********************************************************************************************
async function postFeedback(req, res, next) {
  //console.log("feedbackText",req.body)
  const { feedbackText } = req.body;
  try {
    const newFeedback = feedbackModel({
      feedbackText: feedbackText,
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    next(err);
  }
}

// POST LIKE***************************************************************************************************
async function postLike(req, res, next) {
  const { user, question } = req.body;
  try {
    const newLike = likeModel({
      user: user,
      question: question,
    });
    const savedLike = await newLike.save();
    res.status(201).json(savedLike);
  } catch (err) {
    next(err);
  }
}

export { postLike, postFeedback };