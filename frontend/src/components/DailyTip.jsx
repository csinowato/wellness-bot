function DailyTip() {
  const tips = [
    "💧 Start your day with a glass of water!",
    "🚶‍♀️ Take a 5-minute walking break every hour",
    "🧘‍♂️ Try 3 deep breaths when feeling overwhelmed",
    "🥗 Add one extra vegetable to your lunch today",
    "😴 Set a consistent bedtime routine",
    "📱 Take a 10-minute break from screens",
    "🌞 Get some natural sunlight in the morning",
    "🤝 Reach out to a friend or family member",
    "📝 Write down 3 things you're grateful for",
    "🎵 Listen to your favorite song and dance",
    "🍎 Choose a healthy snack over processed food",
    "💪 Do 10 pushups or stretches",
    "🌱 Spend 5 minutes in nature or with plants",
    "📚 Read something inspiring for 10 minutes",
  ];

  // Rotate tip based on day of year
  const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const todaysTip = tips[dayOfYear % tips.length];

  return (
    <div className="px-4 py-3 bg-yellow-50 border-b border-yellow-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-yellow-600 font-medium text-sm">
            💡 Daily Tip:
          </span>
          <span className="text-sm text-gray-700">{todaysTip}</span>
        </div>
      </div>
    </div>
  );
}

export default DailyTip;
