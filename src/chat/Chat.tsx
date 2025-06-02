import React, { useState } from "react";
import axios from "axios";

export const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const response = await axios.post("/api/chat/", { message: input });
    const reply = response.data.reply;

    setMessages([...newMessages, { role: "assistant", content: reply }]);
  };

  return (
    <div className="p-4 border rounded-xl max-w-md mx-auto">
      <div className="h-64 overflow-y-auto mb-2 border p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span className="block bg-gray-100 p-2 rounded mb-1">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};
