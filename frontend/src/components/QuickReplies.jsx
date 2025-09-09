function QuickReplies({ onQuickReply, isLoading }) {
  const quickReplies = [
    "I'm feeling stressed",
    "Help me sleep better",
    "I need exercise tips",
    "Nutrition advice please",
    "How to manage anxiety",
  ];

  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-gray-600 mb-2 font-medium">
          Quick questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => onQuickReply(reply)}
              disabled={isLoading}
              className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickReplies;
