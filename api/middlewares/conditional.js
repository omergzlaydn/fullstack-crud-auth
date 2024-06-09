// middleware/conditionalMiddleware.js

export const conditionalMiddleware = (middleware, excludePaths = []) => {
  return (req, res, next) => {
    if (excludePaths.includes(req.path)) {
      // If the request path is in the excludePaths array, skip the middleware
      return next();
    }
    // Otherwise, apply the middleware
    return middleware(req, res, next);
  };
};
