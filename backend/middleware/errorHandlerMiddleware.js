const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  // res.status(403).json({msg:"Authentifizierung fehlgeschlagen"})
  // res.status(400).json({error, msg:"Authentifizierung fehlgeschlagen!"})
  res.status(500).json(error.errors);
};

export default errorHandlerMiddleware;
