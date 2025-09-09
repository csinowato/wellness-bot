import { useState } from "react";
import MessageArea from "./MessageArea";
import DailyTip from "./DailyTip";
import QuickReplies from "./QuickReplies";
import { Sun } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "Hi! I'm Finn, your wellness assistant. I can help with exercise, nutrition, mental health, and general wellness questions. How can I support you today?",
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (overrideText) => {
    const textToSend = (overrideText ?? inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMessage = {
      id: Date.now(),
      message: textToSend, // use textToSend, not inputMessage
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        message: data.response,
        isUser: false,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage = {
        id: Date.now() + 1,
        message:
          "Sorry, I'm having trouble connecting right now. Please make sure the backend server is running.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-yellow-400 px-6 py-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-yellow-600" aria-hidden />
            <h1 className="text-xl font-bold text-gray-800">FINN</h1>
          </div>
          <p className="text-sm text-gray-700">
            Your personal health & wellness assistant
          </p>
        </div>
      </div>

      <DailyTip />

      {/* Messages + Input Area */}
      <MessageArea
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ChatBot;
