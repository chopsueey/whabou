export const validateFeedback = (req, res, next) => {
  if (!req.body.feedback.length > 0) {
    res
      .status(400)
      .json(
        "Das Feedback muss aus mindestens 5 Zeichen und nicht mehr als 1000 Zeichen bestehen!"
      );
  }
  next();
};
