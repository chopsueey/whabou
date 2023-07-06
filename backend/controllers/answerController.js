import Answer from "../model/answeredModel.js";
import Question from "../model/questionModel.js";

// increase or decrease answer
export async function answerCounter(req, res, next) {
  try {
    const userId = req.user.userId;
    const questionId = req.body.questionId;

    const question = await Question.findById(questionId);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Couldn't find requested question." });
    }

    const { userAnswer } = req.body;

    if (userAnswer === "yes") {
      question.yes += 1;
    } else if (userAnswer === "no") {
      question.no += 1;
    } else {
      return res.status(400).json({ message: "Action not allowed" });
    }
    const updatedQuestion = await question.save();

    // create new Answer
    const answeredQuestion = await Answer({
      question: questionId,
      user: userId,
      answer: userAnswer,
    });
    const savedAnswer = await answeredQuestion.save();

    res.status(200).json({ updatedQuestion, savedAnswer });
  } catch (error) {
    next(error);
  }
}

export async function deleteAnswer(req, res, next) {
  try {
    const userId = req.user.userId;
    const questionId = req.body.questionId;
    const question = await Question.findById(questionId);

    if (!question) {
      return res
        .status(404)
        .json({ message: "Couldn't find requested question." });
    }

    // delete Like
    const answerToDelete = await Answer.findOne({
      question: questionId,
      user: userId,
    });

    if (answerToDelete.answer === "yes") {
      question.yes -= 1;
    } else {
      question.no -= 1;
    }

    const updatedQuestion = await question.save();

    const deletedAnswer = await Answer.findByIdAndDelete(answerToDelete._id);

    res
      .status(200)
      .json({ updatedQuestion: updatedQuestion, deletedAnswer: deletedAnswer });
  } catch (error) {
    next(error);
  }
}
