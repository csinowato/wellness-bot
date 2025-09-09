// Sample wellness knowledge base for the chatbot

const knowledgeBase = {
  exercise: [
    "Start with 20-30 minutes of walking daily",
    "Try bodyweight exercises like push-ups and squats",
  ],

  mental_health: [
    "Practice deep breathing: inhale 4 counts, exhale 6 counts",
    "Try meditation apps like Headspace or Calm",
  ],

  nutrition: [
    "Eat colorful fruits and vegetables, aim for 5 servings daily",
    "Stay hydrated with 8 glasses of water per day",
  ],

  sleep: [
    "Aim for 7-9 hours of sleep with consistent bedtime",
    "No screens 1 hour before bed for better sleep quality",
  ],

  stress_management: [
    "Take 5-minute breaks throughout your day",
    "Break large tasks into smaller, manageable steps",
  ],
};

// Helper function to get knowledge as a formatted string for AI prompt
const getKnowledgeBaseString = () => {
  let knowledgeString = "";

  for (const [category, tips] of Object.entries(knowledgeBase)) {
    knowledgeString += `\n${category.toUpperCase().replace("_", " ")}:\n`;
    tips.forEach((tip) => {
      knowledgeString += `- ${tip}\n`;
    });
  }

  return knowledgeString;
};

module.exports = {
  knowledgeBase,
  getKnowledgeBaseString,
};
