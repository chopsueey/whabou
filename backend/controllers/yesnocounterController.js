import Question from "../model/questionModel.js";

// Zähler für Yes und No aktualisieren
async function updateCounter(req, res, next) {
  try {
    const questionId = req.body.id;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    const { action } = req.body;

    if (action === "increaseYes") {
      question.yes += 1;
    } else if (action === "decreaseYes" && question.yes > 0) {
      question.yes -= 1;
    } else if (action === "increaseNo") {
      question.no += 1;
    } else if (action === "decreaseNo" && question.no > 0) {
      question.no -= 1;
    } else {
      return res.status(400).json({ message: "Ungültige Aktion" });
    }

    await question.save();

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}

export { updateCounter };
