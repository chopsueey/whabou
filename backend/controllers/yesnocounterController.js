import Question from "../model/questionModel.js";


// Frage mit Yes-Zähler erhöhen
async function increaseYes(req, res, next) {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      //console.log("Frage nicht gefunden");
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    question.yes += 1;
    await question.save();
    
    //console.log(question);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}

// Frage mit Yes-Zähler verringern
async function decreaseYes(req, res, next) {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      //console.log("Frage nicht gefunden");
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    if (question.yes > 0) {
      question.yes -= 1;
      await question.save();
    }

    //console.log(question);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}

// Frage mit No-Zähler erhöhen
async function increaseNo(req, res, next) {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      //console.log("Frage nicht gefunden");
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    question.no += 1;
    await question.save();

    //console.log(question);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}

// Frage mit No-Zähler verringern
async function decreaseNo(req, res, next) {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      //console.log("Frage nicht gefunden");
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    if (question.no > 0) {
      question.no -= 1;
      await question.save();
    }

    //console.log(question);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}


export {
  increaseYes,
  decreaseYes,
  increaseNo,
  decreaseNo,
};
