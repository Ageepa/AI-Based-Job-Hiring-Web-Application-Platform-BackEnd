const AuthorizationMiddleware = (req, res, next) => {
    if (req.auth.claims.metadata.role !== "admin") {
      throw new ForbiddenError("You are not authorized to perform this action");
    }
    next();
  };
  
  export default AuthorizationMiddleware;