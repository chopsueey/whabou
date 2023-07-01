import Like from "../model/likeModel.js";
import Question from "../model/questionModel.js";

// increase like
export async function increaseLike(req, res, next) {
  try {
    const userId = req.user.userId;
    const questionId = req.body.questionId;

    const question = await Question.findById(questionId);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Couldn't find requested question." });
    }

    question.likes += 1;

    const updatedQuestion = await question.save();

    // create new Like
    const createLike = await Like({
      question: questionId,
      user: userId,
    });
    const savedLike = await createLike.save();

    res.status(200).json({ updatedQuestion, savedLike });
  } catch (error) {
    next(error);
  }
}

// decrease like and delete like
export async function deleteLike(req, res, next) {
  try {
    const userId = req.user.userId;
    const questionId = req.body.questionId;
    const question = await Question.findById(questionId);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Couldn't find requested question." });
    }

    question.likes -= 1;

    const updatedQuestion = await question.save();

    // delete Like
    const likeToDelete = await Like.findOne({
      question: questionId,
      user: userId,
    });

    const deletedLike = await Like.findByIdAndDelete(likeToDelete._id);

    res.status(200).json({ updatedQuestion, deletedLike: deletedLike });
  } catch (error) {
    next(error);
  }
}
