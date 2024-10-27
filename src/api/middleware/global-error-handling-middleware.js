const globalErrorHandlingMiddleware = (error, req, res, next) => {
  console.log(error);
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  if (error.name === "NotFoundError") {
    return res.status(404).json({ message: error.message });
  }
  if (error.message == "Unauthenticated") {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export default globalErrorHandlingMiddleware;
