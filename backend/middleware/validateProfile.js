export const validateProfile = (req, res, next) => {
  if (!req.body.profile.length > 0) {
    res
      .status(400)
      .json("What is your name, country and age?");
  }
  next();
};
