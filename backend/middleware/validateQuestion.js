export const validateQuestion = (req, res, next) => {
  if (!req.body.question.length > 0) {
    res
      .status(400)
      .json(
        "Die Frage muss aus mindestens 5 Zeichen und nicht mehr als 1000 Zeichen bestehen!"
      );
  }
  next();
};
