const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(500).json("irgendwas ist schiefgelaufen");
};

export default errorHandlerMiddleware;