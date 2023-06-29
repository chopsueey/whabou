import Answer from "../model/answeredModel.js";
import Question from "../model/questionModel.js";

// increase or decrease answer
export async function answerCounter(req, res, next) {
  try {
    const userId = req.user.userId;
    const questionId = req.body.questionId;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    const { userAnswer } = req.body;

    if (userAnswer === "yes") {
      question.yes += 1;
      console.log(question);
    } else if (userAnswer === "decreaseYes" && question.yes > 0) {
      question.yes -= 1;
    } else if (userAnswer === "no") {
      question.no += 1;
      console.log(question);
    } else if (userAnswer === "decreaseNo" && question.no > 0) {
      question.no -= 1;
    } else {
      return res.status(400).json({ message: "Ungültige Aktion" });
    }
    const updatedQuestion = await question.save();

    // create new Answer
    const answeredQuestion = await Answer({
      question: questionId,
      user: userId,
    });
    const savedAnswer = await answeredQuestion.save();

    res.status(200).json({ updatedQuestion, savedAnswer });
  } catch (error) {
    next(error);
  }
}

export async function checkIfAnswered(req, res, next) {
  try {
    const userId = req.user.userId;
    const questionId = req.params.questionId;
    console.log(req.params.questionId);
    const answer = await Answer.findOne({ user: userId, question: questionId })
      .populate("question")
      .exec();
    if (answer) {
      console.log(answer);
      res.status(200).json({ answer });
    }
    // res.status(201).json({msg: "not answered"})
  } catch (err) {
    next(err);
  }
}
