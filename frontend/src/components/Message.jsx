function Message({ message, isUser, timestamp }) {
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 message-appear`}
    >
      <div
        className={`max-w-lg lg:max-w-xl px-4 py-2 rounded-xl shadow-sm ${
          isUser
            ? "bg-gray-700 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p
            className={`text-xs mt-1 ${
              isUser ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}

export default Message;
