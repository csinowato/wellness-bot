// CORS and error handling middleware

const cors = require("cors");

const corsMiddleware = cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
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
