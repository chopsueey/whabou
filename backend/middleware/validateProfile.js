export const validateProfile = (req, res, next) => {
  if (!req.body.profile.length > 0) {
    res
      .status(400)
      .json("Bitte machen Sie Angaben zu Name, Nationalität und Alter");
  }
  next();
};
