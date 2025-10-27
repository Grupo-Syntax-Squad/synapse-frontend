import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import ChatService from "@/shared/services/Chat";
import { webSocketService, WebSocketEventType } from "@/shared/services/WebSocket";
import type { IChatMessage } from "@/interfaces/services/Chat";
import { useAuth } from "@/shared/context";

const ChatProvider: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchAndConnect = async () => {
      try {
        // Fetch chat history first
        const history = await ChatService.fetchHistory(user.id);
        setMessages(history || []);

        // Then connect to WebSocket
        await webSocketService.connect({ path: "/ws/chat" });
        setConnected(true);
      } catch (err) {
        console.error("Failed to initialize chat", err);
      }
    };

    fetchAndConnect();

    const onMessage = (data: unknown) => {
      try {
        const msg = data as IChatMessage;
        setMessages((prev) => [...prev, msg]);
        setIsWaitingResponse(false);
      } catch (error) {
        console.error("Invalid message format", error);
      }
    };

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    webSocketService.on(WebSocketEventType.CHAT_MESSAGE, onMessage);
    webSocketService.on(WebSocketEventType.CONNECT, onConnect);
    webSocketService.on(WebSocketEventType.DISCONNECT, onDisconnect);

    return () => {
      webSocketService.off(WebSocketEventType.CHAT_MESSAGE, onMessage);
      webSocketService.off(WebSocketEventType.CONNECT, onConnect);
      webSocketService.off(WebSocketEventType.DISCONNECT, onDisconnect);
    };
  }, [user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user?.id || isWaitingResponse) return;
    
    try {
      // Send message via WebSocket
      const message = {
        message: input,
        user_id: user.id,
        user_message: true,
        created_at: new Date().toISOString()
      };
      
      // Add user message to chat
      setMessages(prev => [...prev, message]);
      
      // Send via WebSocket and wait for response
      webSocketService.send(WebSocketEventType.CHAT_MESSAGE, message);
      setIsWaitingResponse(true);
      setInput("");
    } catch (error) {
      console.error("Failed to send message", error);
      setIsWaitingResponse(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column" style={{ minHeight: 300 }}>
        <div className="flex-grow-1 overflow-auto mb-3">
          {messages.map((m, index) => (
            <div 
              key={index} 
              className={`mb-3 ${m.user_message ? 'text-end' : ''}`}
            >
              <div 
                className={`d-inline-block p-3 rounded-3 ${
                  m.user_message 
                    ? 'bg-primary text-white' 
                    : 'bg-light border'
                }`}
                style={{ maxWidth: '85%', textAlign: 'left' }}
              >
                <div className="mb-1">
                  <strong>{m.user_message ? 'You' : 'Assistant'}</strong>
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.message}</div>
                <div className={`mt-1 small ${m.user_message ? 'text-white-50' : 'text-muted'}`}>
                  {new Date(m.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          {isWaitingResponse && (
            <div className="mb-3">
              <div className="d-inline-block p-3 rounded-3 bg-light border">
                <div className="mb-1">
                  <strong>Assistant</strong>
                </div>
                <div className="text-muted">
                  <small>Typing...</small>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="d-flex gap-2 align-items-end"
        >
          <Form.Control
            as="textarea"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={connected ? "Type a message..." : "Connecting..."}
          />
          <Button type="submit" variant="primary" disabled={!connected}>
            Send
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ChatProvider;
