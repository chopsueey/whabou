import Question from "../model/questionModel.js";


// Frage mit Yes-Zähler erhöhen
async function increaseYes(req, res, next) {
  try {

    console.log(req.body)
    const userId = req.user.userId
    console.log(userId)
    const questionId = req.body.questionId;

    const question = await Question.findById(questionId);

    if (!question) {
      //console.log("Frage nicht gefunden");
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }


    const { userAnswer } = req.body;

    if (userAnswer === "yes") {
      question.yes += 1;
      console.log(question)
    } else if (userAnswer === "decreaseYes" && question.yes > 0) {
      question.yes -= 1;
    } else if (userAnswer === "no") {
      question.no += 1;
      console.log(question)
    } else if (userAnswer === "decreaseNo" && question.no > 0) {
      question.no -= 1;
    } else {
      return res.status(400).json({ message: "Ungültige Aktion" });

    }

    //console.log(question);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}





export {
  increaseYes
};
