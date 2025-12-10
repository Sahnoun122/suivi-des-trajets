
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); 

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Erreur serveur",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
