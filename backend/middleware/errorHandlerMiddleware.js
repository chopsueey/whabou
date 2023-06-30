// ERROR HANDLER *************************************************************************************************************************

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  // res.status(403).json({msg:"Authentification failed."})
  // res.status(400).json({error, msg:"Authentification failed."})
  res.status(500).json("Something is wrong");
};

export default errorHandlerMiddleware;
