export const validateLike = (req, res, next) => {
  if (!req.body.like.count > 0) {
    res.status(400).json("Hat Ihnen die Antwort gefallen?");
  }
  next();
};
