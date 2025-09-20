import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Nav from "@/shared/components/layout/Nav";
import Header from "@/shared/components/layout/Header";
import { Send } from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
      + " - " + now.toLocaleDateString([], { day: "2-digit", month: "2-digit" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = { sender: "user", text: input, time: getTime() };
    setMessages((prev) => [...prev, newMessage]);

    setInput("");
    setLoading(true);

    // Simula resposta do bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Essa é a resposta do bot 😃", time: getTime() },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Nav />

      <div className="flex flex-col flex-1 bg-white p-4">
        <div className="flex-1 overflow-y-auto mb-4 p-3 rounded-lg border">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl max-w-xs relative ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gray-300 text-gray-900 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="absolute bottom-[-18px] right-2 text-xs text-gray-500">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-2">
              <ProgressSpinner
                style={{ width: "30px", height: "30px" }}
                strokeWidth="8"
                fill="transparent"
                animationDuration=".5s"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <InputText
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-full px-4 py-2 border"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            className="rounded-full bg-purple-600 border-none"
          >
            <Send className="text-white w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
