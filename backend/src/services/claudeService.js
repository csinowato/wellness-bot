// Service for handling Claude API integration

const Anthropic = require("@anthropic-ai/sdk");
const { getKnowledgeBaseString } = require("../data/knowledgeBase");

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Create the system prompt with our wellness knowledge
const createSystemPrompt = () => {
  const knowledgeString = getKnowledgeBaseString();

  return `You are a friendly wellness chatbot. Give one specific tip from this knowledge:

  ${knowledgeString}

  Instructions:
  - Give ONE helpful tip (1-2 sentences max)
  - For wellness topics: use the knowledge above
  - For other topics: "I'm here for wellness questions about exercise, mental health, nutrition, sleep, or stress!"
  - Keep responses under 30 words when possible`;
};

// Main function to get response from Claude
const getChatResponse = async (userMessage) => {
  try {
    // Validate input
    if (
      !userMessage ||
      typeof userMessage !== "string" ||
      userMessage.trim().length === 0
    ) {
      throw new Error("Invalid message: Message must be a non-empty string");
    }

    // Limit message length to prevent abuse
    if (userMessage.length > 1000) {
      throw new Error(
        "Message too long: Please keep messages under 1000 characters"
      );
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 200, // Keep responses concise
      system: createSystemPrompt(),
      messages: [
        {
          role: "user",
          content: userMessage.trim(),
        },
      ],
    });

    // Extract the response text
    const aiResponse = response.content[0].text;

    return aiResponse;
  } catch (error) {
    console.error("Claude API Error:", error);

    // Handle errors
    if (error.status === 401) {
      throw new Error("Authentication failed: Check your API key");
    } else if (error.status === 429) {
      throw new Error("Rate limit exceeded: Please try again in a moment");
    } else if (error.status >= 500) {
      throw new Error("Claude service temporarily unavailable");
    } else if (error.message.includes("Invalid message")) {
      throw error; // Re-throw validation errors as-is
    } else {
      throw new Error("Failed to get response from wellness bot");
    }
  }
};

module.exports = {
  getChatResponse,
};
