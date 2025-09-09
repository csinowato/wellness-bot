// Express server for wellness chatbot

const express = require("express");
require("dotenv").config();

// Import middleware and routes
const {
  corsMiddleware,
  errorHandler,
  notFoundHandler,
} = require("./middleware/cors");
const chatRoutes = require("./routes/chatRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Apply middleware
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));

// Mount routes
app.use("/api", chatRoutes);

// Handle 404 for unknown routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Wellness bot server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);

  // Check for required environment variables
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("WARNING: ANTHROPIC_API_KEY not found in .env file");
  }
});
