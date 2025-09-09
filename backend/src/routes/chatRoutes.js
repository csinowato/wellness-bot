// Chat API routes

const express = require("express");
const { getChatResponse } = require("../services/claudeService");

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Wellness bot server is running!",
    timestamp: new Date().toISOString(),
  });
});

// Main chat endpoint
router.post("/chat", async (req, res) => {
  try {
    // Extract user message from request body
    const { message } = req.body;

    // Validate request
    if (!message) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Message is required",
      });
    }

    // Get response from Claude
    console.log("User message:", message);
    const aiResponse = await getChatResponse(message);
    console.log("Claude response:", aiResponse);

    // Send response
    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat endpoint error:", error);

    // Handle errors
    if (
      error.message.includes("Invalid message") ||
      error.message.includes("Message too long")
    ) {
      res.status(400).json({
        error: "Bad Request",
        message: error.message,
      });
    } else if (error.message.includes("Authentication failed")) {
      res.status(500).json({
        error: "Server Configuration Error",
        message: "Please check server configuration",
      });
    } else if (error.message.includes("Rate limit")) {
      res.status(429).json({
        error: "Rate Limit",
        message: "Too many requests. Please try again in a moment.",
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong. Please try again.",
      });
    }
  }
});

module.exports = router;
