// CORS and error handling middleware

const cors = require("cors");

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL]
    : ["http://localhost:5173", "http://localhost:3000"];

const corsMiddleware = cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true,
});

const errorHandler = (error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong",
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "Endpoint not found",
  });
};

module.exports = {
  corsMiddleware,
  errorHandler,
  notFoundHandler,
};
