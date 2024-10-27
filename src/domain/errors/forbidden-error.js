class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      this.name = "ForbiddenError";
    }
  }
  
  export default ForbiddenError;