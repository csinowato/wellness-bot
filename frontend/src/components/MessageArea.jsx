import { useRef, useEffect } from "react";
import Message from "./Message";
import QuickReplies from "./QuickReplies";

function MessageArea({
  messages,
  inputMessage,
  setInputMessage,
  sendMessage, // should accept optional override: sendMessage(overrideText?)
  isLoading,
}) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(); // uses current inputMessage
    }
  };

  const handleQuickReply = (reply) => {
    if (isLoading) return;
    setInputMessage(reply); // update input UI
    sendMessage(reply); // send with override to avoid race
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 chat-messages">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg.message}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white px-4 py-3 rounded-xl rounded-bl-none border border-gray-200 shadow-sm">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <QuickReplies onQuickReply={handleQuickReply} isLoading={isLoading} />

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about exercise, nutrition, mental health, or wellness..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder:text-sm placeholder:text-gray-500"
            rows="1"
            style={{ minHeight: "48px", maxHeight: "120px" }}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className="px-6 py-3 bg-yellow-400 text-gray-800 font-medium rounded-xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageArea;
