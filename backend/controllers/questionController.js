import Answer from "../model/answeredModel.js";
import Like from "../model/likeModel.js";
import Profile from "../model/profileModel.js";
import Question from "../model/questionModel.js";

// get
// Alle Fragen abrufen
export async function getAllQuestions(req, res, next) {
  try {
    const questions = await Question.find({})
      .populate("profileId", "userName")
      .exec();
    const userAnswers = await Answer.find({
      user: req.user.userId,
    });
    const userLikes = await Like.find({
      user: req.user.userId,
    });
    res.status(200).json({ found: questions, userAnswers: userAnswers, userLikes: userLikes });
  } catch (error) {
    next(error);
  }
}

// Eine einzelne Frage anzeigen
export async function getQuestion(req, res, next) {
  try {
    const questionId = req.params.id;

    const questions = await Question.findById(questionId)
      .populate("profileId", "userName")
      .exec();

    const userAnswers = await Answer.find({
      user: req.user.userId,
    });
    const userLikes = await Like.find({
      user: req.user.userId,
    });
    if (!questions) {
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    res.status(200).json({ found: questions, userAnswers: userAnswers, userLikes: userLikes });
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
  try {
    if (sortBy === "latest") {
      const sortedQuestions = await Question.find({})
        .sort("-createdAt")
        .limit(numOfQuestionsToShow)
        .populate("profileId", "userName")
        .exec();
      const userAnswers = await Answer.find({
        user: req.user.userId,
      });
      const userLikes = await Like.find({
        user: req.user.userId,
      });
      return res.status(200).json({
        sortBy: sortBy,
        found: sortedQuestions,
        userAnswers: userAnswers,
        userLikes: userLikes,
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
      const userAnswers = await Answer.find({
        user: req.user.userId,
      });
      const userLikes = await Like.find({
        user: req.user.userId,
      });
      return res.status(200).json({
        sortBy: sortBy,
        found: sortedQuestions,
        userAnswers: userAnswers,
        userLikes: userLikes,
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
  } catch (err) {
    next(err);
  }
}

// post
export async function postQuestion(req, res, next) {
  const { question } = req.body;
  const userId = req.user.userId;

  try {
    const userProfile = await Profile.findOne({ userId: userId });
    const newQuestion = Question({
      question: question,
      profileId: userProfile._id,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    next(err);
  }
}
