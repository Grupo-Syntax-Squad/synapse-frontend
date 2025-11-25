import React, { useEffect, useRef, useState } from "react"
import { Card, Button, Form } from "react-bootstrap"
import ChatService from "@/shared/services/Chat"
import {
  ChatWebSocketService,
  ChatWebSocketEventType,
} from "@/shared/services/ChatWebSocket"
import type { IChatMessage } from "@/interfaces/services/Chat"
import { useAuth } from "@/shared/context"
import type { IUserAuth } from "@/interfaces/contexts/Auth"

type ChatHistoryItem = [string, number, boolean, Date]

interface IChatObject {
  type: "chat_message"
  data: IChatMessage
  timestamp: string
}

type ChatMessageResponse = IChatObject

const ChatProvider: React.FC = () => {
  const { user, logout } = useAuth() as {
    user?: IUserAuth | null
    logout?: () => void
  }
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [input, setInput] = useState("")
  const [connected, setConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [isWaitingResponse, setIsWaitingResponse] = useState(false)
  const chatWSRef = useRef<ChatWebSocketService | null>(null)

  useEffect(() => {
    const isLoginPage = window.location.pathname.startsWith("/login")
    if (!user?.id || isLoginPage) return

    // Create chat WebSocket instance
    const chatWS = new ChatWebSocketService()
    chatWSRef.current = chatWS

    const normalizeItem = (
      item: ChatHistoryItem | string | unknown
    ): IChatMessage | null => {
      if (!item) return null
      if (Array.isArray(item) && item.length >= 4) {
        const [text, userId, isUserMessage, timestamp] = item as ChatHistoryItem
        if (typeof text === "string") {
          const trimmed = text.trim()
          if (trimmed.startsWith("Reply:")) {
            const jsonPart = trimmed.replace(/^Reply:\s*/i, "")
            try {
              const parsed = JSON.parse(jsonPart) as ChatMessageResponse
              if (parsed?.type === "chat_message" && parsed.data) {
                return {
                  ...parsed.data,
                  user_message: !!parsed.data.user_message,
                }
              }
            } catch (error) {
              console.debug("Failed to parse Reply: JSON", error)
            }
          }
          return {
            message: trimmed.startsWith("Reply:")
              ? trimmed.substring(6).trim()
              : trimmed,
            user_id: typeof userId === "number" ? userId : 0,
            user_message: !!isUserMessage,
            created_at:
              timestamp instanceof Date
                ? timestamp.toISOString()
                : new Date().toISOString(),
          }
        }
      }
      if (typeof item === "string") {
        const trimmed = item.trim()
        if (trimmed.startsWith("Reply:")) {
          const jsonPart = trimmed.replace(/^Reply:\s*/i, "")
          const parsed = JSON.parse(jsonPart)
          if (parsed && parsed.type === "chat_message" && parsed.data) {
            return {
              ...parsed.data,
              user_message: !!parsed.data.user_message,
            } as IChatMessage
          }
        }
        return {
          message: trimmed,
          user_id: 0,
          user_message: false,
          created_at: new Date().toISOString(),
        } as IChatMessage
      }
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const msgItem = item as Record<string, unknown>
        if (
          typeof msgItem.message === "string" &&
          typeof msgItem.user_message !== "undefined"
        ) {
          return msgItem as unknown as IChatMessage
        }
        if (
          msgItem.type === "chat_message" &&
          msgItem.data &&
          typeof msgItem.data === "object"
        ) {
          return (msgItem as unknown as ChatMessageResponse).data
        }
      }
      return null
    }

    ChatService.fetchHistory(user.id)
      .then((history) => {
        const normalized = Array.isArray(history)
          ? history
              .map((it: ChatHistoryItem | string | unknown) =>
                normalizeItem(it)
              )
              .filter((x: IChatMessage | null): x is IChatMessage => x !== null)
          : []
        setMessages(normalized)
        return chatWS.connect()
      })
      .then(() => {
        setConnected(true)
      })
      .catch((error) => {
        console.error("Failed to initialize chat", error)
      })

    const onMessage = (data: unknown) => {
      try {
        const msg = data as IChatMessage
        setMessages((prev) => [...prev, msg])
        setIsWaitingResponse(false)
      } catch (error) {
        console.error("Invalid message format", error)
      }
    }

    const onConnect = () => setConnected(true)
    const onDisconnect = (data: unknown) => {
      setConnected(false)
      // If disconnect reason is authentication/cookie failure, log out user
      const event = data as { code?: number; reason?: string } | undefined
      if (
        event &&
        event.reason &&
        event.reason.toLowerCase().includes("auth")
      ) {
        if (typeof logout === "function") logout()
      }
    }

    chatWS.on(ChatWebSocketEventType.CHAT_MESSAGE, onMessage)
    chatWS.on(ChatWebSocketEventType.CONNECT, onConnect)
    chatWS.on(ChatWebSocketEventType.DISCONNECT, onDisconnect)

    return () => {
      chatWS.off(ChatWebSocketEventType.CHAT_MESSAGE, onMessage)
      chatWS.off(ChatWebSocketEventType.CONNECT, onConnect)
      chatWS.off(ChatWebSocketEventType.DISCONNECT, onDisconnect)
      chatWS.disconnect()
    }
  }, [user?.id, logout])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || !user?.id || isWaitingResponse || !chatWSRef.current)
      return

    try {
      const message = {
        message: input,
        user_id: user.id,
        user_message: true,
        created_at: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, message])

      chatWSRef.current.send(message)
      setIsWaitingResponse(true)
      setInput("")
    } catch (error) {
      console.error("Failed to send message", error)
      setIsWaitingResponse(false)
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Body
        className="d-flex flex-column"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <div
          className="flex-grow-1 overflow-y-auto mb-3"
          style={{ maxHeight: "100%" }}
        >
          {messages.map((m, index) => (
            <div
              key={index}
              className={`mb-3 ${m.user_message ? "text-end" : ""}`}
            >
              <div
                className={`d-inline-block p-3 rounded-3 ${
                  m.user_message ? "bg-primary text-white" : "bg-light border"
                }`}
                style={{ maxWidth: "85%", textAlign: "left" }}
              >
                <div className="mb-1">
                  <strong>{m.user_message ? "You" : "Assistant"}</strong>
                </div>
                <div style={{ whiteSpace: "pre-wrap" }}>{m.message}</div>
                <div
                  className={`mt-1 small ${
                    m.user_message ? "text-white-50" : "text-muted"
                  }`}
                >
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
            e.preventDefault()
            handleSend()
          }}
          className="d-flex gap-2 align-items-end"
        >
          <Form.Control
            as="textarea"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={
              connected
                ? "Type a message... (Press Enter to send)"
                : "Connecting..."
            }
          />
          <Button type="submit" variant="primary" disabled={!connected}>
            Send
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ChatProvider
