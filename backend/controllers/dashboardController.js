import likeModel from "../model/likeModel.js";

// Deutsch#####################################################################################################
// wird noch ausgelagert
// new LIKE controller for the new likeModel
// which needs the userId and the questionId which was liked

// English ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// still outsourced
// new LIKE controller for the new likeModel
// which needs the userId and the questionId which was liked

// POST LIKE****************************************************************************************************

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

export { postLike };
