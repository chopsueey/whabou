export const validateQuestion = (req, res, next) => {
  if (!req.body.question.length > 0) {
    res
      .status(400)
      .json(
        "The question shall have minimum 5 and maximum 1000 letters"
      );
  }
  next();
};
