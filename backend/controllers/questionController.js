import Question from "../model/questionModel.js";

// Alle Fragen abrufen
async function getAllQuestions(req, res, next) {
  try {
    const questions = await Question.find();

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

// Eine einzelne Frage anzeigen
async function getQuestion(req, res, next) {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

// Frage erstellen
async function createQuestion(req, res, next) {
  try {
    const { title, content } = req.body;

    const newQuestion = await Question.create({ title, content });

    res.status(201).json(newQuestion);
  } catch (error) {
    next(error);
  }
};

export {
  getAllQuestions,
  getQuestion,
  createQuestion,
}
