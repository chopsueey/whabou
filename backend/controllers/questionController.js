import Question from "../model/questionModel.js";

// get
// Alle Fragen abrufen
async function getAllQuestions(req, res, next) {
  try {
    const questions = await Question.find({});

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
}

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
}

// post
async function postQuestion(req, res, next) {
  const { question, userId } = req.body;

  try {
    const newQuestion = Question({
      question: question,
      userId: userId,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    next(err);
  }
}

export { getAllQuestions, getQuestion, postQuestion };
