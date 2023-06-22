import Question from "../model/questionModel.js";

// get
// Alle Fragen abrufen
export async function getAllQuestions(req, res, next) {
  try {
    const questions = await Question.find().populate("userId", "name").exec();

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
}

// Eine einzelne Frage anzeigen
export async function getQuestion(req, res, next) {
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

// controller for providing frontend with the latest questions
// for the user feed
// user can check certain time range for created questions

export async function getLatestQuestion(req, res, next) {
  const numOfQuestionsToShow = 10;

  const sortBy = req.query.sortBy;

  // latest

  if (sortBy === "latest") {
    const sortedQuestions = await Question.find({})
      .sort("-createdAt")
      .limit(numOfQuestionsToShow)
      .populate("profileId", "userName")
      .exec();
    return res.status(200).json({
      sortBy: sortBy,
      found: sortedQuestions,
    });
  }

  // hour

  if (sortBy === "lastHour") {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const sortedQuestions = await Question.find({
      createdAt: { $gte: oneHourAgo },
    })
      .sort("-createdAt")
      .limit(numOfQuestionsToShow)
      .populate("profileId", "userName")
      .exec();
    return res.status(200).json({
      sortBy: sortBy,
      found: sortedQuestions,
    });
  }
  // 12 hours
  // 24 hours
  // week
  // month
  // oldest?

  // const oneDayAgo = new Date();

  // const oneMinAgo = new Date();

  // oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  // oneMinAgo.setMinutes(oneMinAgo.getMinutes() - 1);
  // if (sortBy === "lastHour") {
  //   const oneHourAgo = new Date();
  //   oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  //   const sortedQuestions = await Question.find({
  //     createdAt: { $gte: oneHourAgo },
  //   })
  //     .sort("-createdAt")
  //     .limit(numOfQuestionsToShow)
  //     .populate("userId", "userName")
  //     .exec();
  //   return res.status(200).json({
  //     sortBy: sortBy,
  //     found: sortedQuestions,
  //   });
  // }
}

// post
export async function postQuestion(req, res, next) {
  const { question, profileId } = req.body;

  try {
    const newQuestion = Question({
      question: question,
      profileId: profileId,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    next(err);
  }
}
