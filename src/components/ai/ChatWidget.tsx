"use client";

import { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.reply ?? "Sorry, I couldn't understand 😅",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Connection error. Try again 😥" },
      ]);
    }
  };

  return (
    <>
      {/* --- FLOATING BUTTON --- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full 
          bg-gradient-to-br from-blue-600 to-blue-700 text-white 
          flex items-center justify-center text-3xl shadow-xl
          hover:scale-110 active:scale-90 transition-all duration-300 
          animate-bounce-slow z-[999999]"
        >
          <IoChatbubbleEllipsesOutline />
        </button>
      )}

      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-80 md:w-96 h-[480px]
          bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200
          flex flex-col overflow-hidden z-[999999] 
          animate-slide-up"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 
          flex justify-between items-center shadow">
            <h3 className="font-semibold text-lg">IFDP AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-lg transition"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm 
                shadow-md leading-relaxed
                ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-t bg-white/80 backdrop-blur-md flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm
              focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md 
              hover:bg-blue-700 active:scale-95 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* --- CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.35s ease-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
